import { useI18n } from "@/lib/i18n/I18nProvider";

export default function Matches() {
  const { t } = useI18n();

  return (
    <div style={{ background: "#f4f7fc", minHeight: "calc(100vh - 68px)" }}>
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "40px 80px",
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
    </div>
  );
}
