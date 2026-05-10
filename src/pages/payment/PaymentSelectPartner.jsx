import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PartnerTable from "@/components/PartnerTable";
import PartnerTableSkeleton from "@/components/payment/PartnerTableSkeleton";
import SquareButton from "@/components/SquareButton";
import { useMyPartners } from "@/hooks/payments/useMyPartners";

export default function PaymentSelectPartner({
  selectedPartner,
  onSelect,
  onNext,
}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isFetching } = useMyPartners(page);

  const partners = (data?.data ?? []).map((p) => ({
    ...p,
    name: p.name_en || p.name_kr,
    location: { country: p.country },
    industry: (p.industry_en || p.industry_kr || "").split(";").filter(Boolean),
    profileText: p.intro_en || p.intro_kr,
    websiteUrl: p.website,
  }));

  const totalPages = data?.totalPages ?? 1;
  const checkedIds = new Set(selectedPartner ? [selectedPartner._id] : []);

  const handleToggleOne = (id) => {
    const partner = partners.find((p) => p._id === id);
    onSelect(selectedPartner?._id === id ? null : partner);
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "40px 104px 20px 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            background: "#fafafa",
            borderRadius: 8,
            padding: "4px 12px",
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 500, color: "#080616" }}>
            My Partner List
          </span>
        </div>
        <SquareButton
          variant="primary"
          onClick={() => navigate("/matches")}
          style={{ width: "auto", padding: "8px 16px" }}
        >
          Find More Partners
        </SquareButton>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 80px" }}>
        {isFetching ? (
          <PartnerTableSkeleton />
        ) : (
          <PartnerTable
            partners={partners}
            isFetching={isFetching}
            submittedQuery={true}
            checkedIds={checkedIds}
            onToggleAll={() => {}}
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
          variant="primary"
          disabled={!selectedPartner}
          onClick={onNext}
        >
          Next
        </SquareButton>
      </div>
    </div>
  );
}
