import { useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function MyBusiness() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("my-info");

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>
      <div style={{ background: "#f4f7fc" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            padding: "40px 80px",
          }}
        >
          <div
            style={{
              border: "0.5px solid #0056ee",
              borderRadius: 999,
              padding: "8px 12px",
              background: "#f4f7fc",
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 500, color: "#0056ee" }}>
              {t("my_business_badge")}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#080616",
                textAlign: "center",
                lineHeight: "38px",
              }}
            >
              {t("my_business_title")}
            </span>
            <span style={{ fontSize: 16, color: "#a2a0a0" }}>
              {t("my_business_subtitle")}
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: "40px 80px 20px" }}>
        <div
          style={{
            background: "#edf1f4",
            borderRadius: 8,
            height: 40,
            width: 247,
            position: "relative",
          }}
        >
          <button
            onClick={() => setActiveTab("my-info")}
            style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 104,
              padding: "4px 12px",
              borderRadius: 8,
              border: activeTab === "my-info" ? "1px solid #dadada" : "none",
              background: activeTab === "my-info" ? "#fafafa" : "transparent",
              fontSize: 16,
              fontWeight: 500,
              color: "#080616",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {t("my_business_tab_my_info")}
          </button>
          <button
            onClick={() => setActiveTab("partner-list")}
            style={{
              position: "absolute",
              left: 108,
              top: 4,
              padding: "4px 12px",
              borderRadius: 8,
              border:
                activeTab === "partner-list" ? "1px solid #dadada" : "none",
              background:
                activeTab === "partner-list" ? "#fafafa" : "transparent",
              fontSize: 16,
              fontWeight: 500,
              color: "#080616",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {t("my_business_tab_partner_list")}
          </button>
        </div>
      </div>

      <div>{activeTab === "my-info" ? <div /> : <div />}</div>
    </div>
  );
}
