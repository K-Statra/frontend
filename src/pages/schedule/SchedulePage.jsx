import underConstruction from "@/assets/schedule/under_construction.png";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function SchedulePage() {
  const { t } = useI18n();

  return (
    <div
      style={{
        background: "#f4f7fc",
        minHeight: "calc(100vh - 68px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          padding: "148px 80px 40px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#0056ee",
            lineHeight: "38px",
          }}
        >
          {t("schedule_title")}
        </span>
        <span style={{ fontSize: 16, color: "#a2a0a0" }}>
          {t("schedule_subtitle")}
        </span>
      </div>

      <img
        src={underConstruction}
        alt=""
        style={{
          position: "absolute",
          bottom: 102,
          left: "50%",
          transform: "translateX(-50%)",
          height: "calc(100vh - 68px - 204px)",
          maxHeight: 708,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
