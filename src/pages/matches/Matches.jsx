import { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useI18n } from "@/lib/i18n/I18nProvider";
import PageHero from "@/components/shared/PageHero";
import PartnerSearchInput from "@/components/matches/PartnerSearchInput";
import PartnerTable from "@/components/shared/PartnerTable";
import SquareButton from "@/components/shared/SquareButton";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { usePartnerSearch } from "@/hooks/matches/usePartners";
import { useSavePartner } from "@/hooks/matches/useSavePartner";

export default function Matches() {
  const { t } = useI18n();
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [checkedIds, setCheckedIds] = useState(new Set());
  const [hiddenIds, setHiddenIds] = useState(new Set());

  const { data, isFetching } = usePartnerSearch(submittedQuery);
  const partners = (data?.data ?? []).filter((p) => !hiddenIds.has(p._id));

  const { saveAll, isPending } = useSavePartner();

  const toggleAll = () => {
    if (checkedIds.size === partners.length && partners.length > 0) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(partners.map((p, i) => p._id ?? i)));
    }
  };

  const toggleOne = (id) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddPartners = async () => {
    const validItems = partners
      .filter(
        (p) => checkedIds.has(p._id) && /^[a-f0-9]{24}$/i.test(String(p._id)),
      )
      .map((p) => ({
        partnerId: p._id,
        partnerType: p.tags?.includes("Buyer") ? "buyer" : "seller",
      }));

    if (validItems.length === 0) {
      toast.error("웹 검색 결과는 파트너로 저장할 수 없습니다.");
      return;
    }

    const skipped = checkedIds.size - validItems.length;
    const { saved, alreadySaved, savedIds } = await saveAll(validItems);

    if (savedIds.length > 0) {
      setHiddenIds((prev) => new Set([...prev, ...savedIds]));
    }

    if (saved > 0 && skipped === 0 && alreadySaved === 0) {
      toast.success(`${saved}개 파트너가 저장되었습니다.`);
    } else if (saved > 0 && skipped > 0) {
      toast.success(`${saved}개 저장 완료 (웹 결과 ${skipped}개 제외)`);
    } else if (saved > 0 && alreadySaved > 0) {
      toast.success(
        `${saved}개 저장 완료 (${alreadySaved}개는 이미 저장된 파트너)`,
      );
    } else if (alreadySaved > 0) {
      toast(`이미 저장된 파트너입니다.`);
    }

    setCheckedIds(new Set());
  };

  return (
    <div style={{ background: "#f4f7fc", minHeight: "calc(100vh - 68px)" }}>
      <PageHero
        badge={t("matches_badge")}
        title={t("matches_title")}
        subtitle={t("matches_subtitle")}
      />

      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "40px 80px 0",
        }}
      >
        <PartnerSearchInput
          onSearch={(q) => {
            setSubmittedQuery(q);
            setHiddenIds(new Set());
          }}
          isLoading={isFetching}
        />
      </div>

      {submittedQuery && (
        <div
          style={{
            background: isFetching ? "#f4f7fc" : "#fafafa",
            marginTop: 40,
            paddingBottom: isFetching ? 0 : 40,
          }}
        >
          {isFetching ? (
            <LoadingSpinner />
          ) : (
            <>
              <div
                style={{
                  maxWidth: 1440,
                  margin: "0 auto",
                  padding: "32px 104px 32px 80px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <SquareButton
                  variant="primary"
                  disabled={checkedIds.size === 0 || isPending}
                  onClick={handleAddPartners}
                  style={{
                    width: 148,
                    padding: "8px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                  }}
                >
                  <Plus size={24} strokeWidth={1.5} />
                  {t("matches_add_partner")}
                </SquareButton>
              </div>

              <div
                style={{ maxWidth: 1440, margin: "0 auto", padding: "0 80px" }}
              >
                <PartnerTable
                  partners={partners}
                  isFetching={isFetching}
                  submittedQuery={submittedQuery}
                  checkedIds={checkedIds}
                  onToggleAll={toggleAll}
                  onToggleOne={toggleOne}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
