import { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useI18n } from "@/lib/i18n/I18nProvider";
import PartnerSearchInput from "@/components/PartnerSearchInput";
import PartnerTable from "@/components/PartnerTable";
import SquareButton from "@/components/SquareButton";
import { usePartnerSearch } from "@/hooks/matches/usePartners";
import { useSavePartner } from "@/hooks/matches/useSavePartner";

export default function Matches() {
  const { t } = useI18n();
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [checkedIds, setCheckedIds] = useState(new Set());

  const { data, isFetching } = usePartnerSearch(submittedQuery);
  const partners = data?.data ?? [];

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
    const { saved, alreadySaved } = await saveAll([...checkedIds]);

    if (saved > 0 && alreadySaved === 0) {
      toast.success(`${saved}개 파트너가 저장되었습니다.`);
    } else if (saved > 0 && alreadySaved > 0) {
      toast.success(
        `${saved}개 저장 완료 (${alreadySaved}개는 이미 저장된 파트너)`,
      );
    } else if (alreadySaved > 0) {
      toast(`이미 저장된 파트너입니다.`, { icon: "ℹ️" });
    }

    setCheckedIds(new Set());
  };

  return (
    <div style={{ background: "#f4f7fc", minHeight: "calc(100vh - 68px)" }}>
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "40px 80px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            background: "#f4f7fc",
            border: "1px solid #0056ee",
            borderRadius: 999,
            padding: "8px 12px",
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#0056ee",
              lineHeight: "16px",
            }}
          >
            {t("matches_badge")}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#080616",
              margin: 0,
              lineHeight: "38px",
            }}
          >
            {t("matches_title")}
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#a2a0a0",
              margin: 0,
              lineHeight: "22px",
            }}
          >
            {t("matches_subtitle")}
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "40px 80px 0",
        }}
      >
        <PartnerSearchInput
          onSearch={setSubmittedQuery}
          isLoading={isFetching}
        />
      </div>

      <div
        style={{
          background: "#fafafa",
          marginTop: 40,
          paddingBottom: 40,
        }}
      >
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

        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 80px" }}>
          <PartnerTable
            partners={partners}
            isFetching={isFetching}
            submittedQuery={submittedQuery}
            checkedIds={checkedIds}
            onToggleAll={toggleAll}
            onToggleOne={toggleOne}
          />
        </div>
      </div>
    </div>
  );
}
