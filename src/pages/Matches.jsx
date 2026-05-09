import { useState } from "react";
import { Plus } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import PartnerSearchInput from "@/components/PartnerSearchInput";
import PartnerTableRow from "@/components/PartnerTableRow";
import SquareButton from "@/components/SquareButton";
import { usePartnerSearch } from "@/hooks/usePartners";

const TABLE_HEADERS = [
  { key: "company", width: 417 },
  { key: "country", width: 180 },
  { key: "industries", width: 197 },
  { key: "profile", width: null },
];

export default function Matches() {
  const { t } = useI18n();
  const [submittedQuery, setSubmittedQuery] = useState("");

  const { data, isFetching } = usePartnerSearch(submittedQuery);
  const partners = data?.data ?? [];

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
          <div
            style={{
              display: "flex",
              gap: 20,
              alignItems: "center",
              padding: "0 20px",
              background: "#edf1f4",
            }}
          >
            <div style={{ width: 24, flexShrink: 0 }} />
            <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
              {TABLE_HEADERS.map(({ key, width }) => (
                <div
                  key={key}
                  style={{
                    width: width ?? undefined,
                    flex: width ? undefined : 1,
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#434055",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t(`matches_col_${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {partners.map((partner, i) => (
            <PartnerTableRow
              key={partner._id ?? i}
              name={partner.name ?? partner.sellerName}
              country={partner.country}
              industries={partner.industries}
              profile={partner.sellerIntroduction}
              avatarUrl={partner.profileImageUrl}
            />
          ))}

          {!submittedQuery && (
            <div
              style={{
                padding: "40px 0",
                textAlign: "center",
                fontSize: 14,
                color: "#a2a0a0",
              }}
            >
              {t("matches_empty_prompt")}
            </div>
          )}

          {!isFetching && submittedQuery && partners.length === 0 && (
            <div
              style={{
                padding: "40px 0",
                textAlign: "center",
                fontSize: 14,
                color: "#a2a0a0",
              }}
            >
              {t("matches_no_results")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
