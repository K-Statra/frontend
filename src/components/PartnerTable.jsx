import { useI18n } from "@/lib/i18n/I18nProvider";
import PartnerTableRow from "@/components/PartnerTableRow";

const TABLE_HEADERS = [
  { key: "company", width: 417 },
  { key: "country", width: 180 },
  { key: "industries", width: 197 },
  { key: "profile", width: null },
];

export default function PartnerTable({ partners, isFetching, submittedQuery }) {
  const { t } = useI18n();

  return (
    <div>
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
  );
}
