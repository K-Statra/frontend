import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { useI18n } from "@/lib/i18n/I18nProvider";
import PartnerTable from "@/components/PartnerTable";
import PartnerTableSkeleton from "@/components/payment/PartnerTableSkeleton";
import SquareButton from "@/components/SquareButton";
import { useMyPartners } from "@/hooks/myBusiness/useMyPartners";
import { useRemovePartner } from "@/hooks/myBusiness/useRemovePartner";

export default function MyPartnerList() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [checkedIds, setCheckedIds] = useState(new Set());
  const { data, isFetching } = useMyPartners(page);
  const { mutateAsync: removePartner, isPending } = useRemovePartner();

  const partners = (data?.data ?? []).map((p) => ({
    ...p,
    name: p.name_en || p.name_kr,
    location: { country: p.country },
    industry: (p.industry_en || p.industry_kr || "").split(";").filter(Boolean),
    profileText: p.intro_en || p.intro_kr,
    websiteUrl: p.website,
  }));

  const totalPages = data?.totalPages ?? 1;

  const handleToggleAll = () => {
    if (checkedIds.size === partners.length) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(partners.map((p) => p._id)));
    }
  };

  const handleToggleOne = (id) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleDelete = async () => {
    if (checkedIds.size === 0) return;
    try {
      await Promise.all([...checkedIds].map((id) => removePartner(id)));
      setCheckedIds(new Set());
      toast.success("파트너가 삭제되었습니다.");
    } catch {
      toast.error("삭제에 실패했습니다.");
    }
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 104px 20px 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <SquareButton
          variant="primary"
          onClick={() => navigate("/matches")}
          style={{ width: "auto", padding: "8px 16px" }}
        >
          {t("payment_find_more_partners")}
        </SquareButton>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 80px" }}>
        {isFetching ? (
          <PartnerTableSkeleton />
        ) : (
          <PartnerTable
            partners={partners}
            isFetching={isFetching}
            submittedQuery
            checkedIds={checkedIds}
            onToggleAll={handleToggleAll}
            onToggleOne={handleToggleOne}
          />
        )}

        {!isFetching && totalPages > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginTop: 24,
            }}
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                background: "none",
                border: "none",
                cursor: page === 1 ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                color: page === 1 ? "#dadada" : "#080616",
                padding: 4,
              }}
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: p === page ? 600 : 400,
                  background: p === page ? "#0056ee" : "transparent",
                  color: p === page ? "#fafafa" : "#080616",
                }}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                background: "none",
                border: "none",
                cursor: page === totalPages ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                color: page === totalPages ? "#dadada" : "#080616",
                padding: 4,
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <SquareButton
          variant="solid"
          disabled={checkedIds.size === 0 || isPending}
          onClick={handleDelete}
        >
          {t("my_partner_delete")}
        </SquareButton>
      </div>
    </div>
  );
}
