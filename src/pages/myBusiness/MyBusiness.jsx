import { useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import PageHero from "@/components/PageHero";
import MyInfo from "@/pages/myBusiness/MyInfo";
import MyPartnerList from "@/pages/myBusiness/MyPartnerList";

export default function MyBusiness() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("my-info");

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>
      <PageHero
        badge={t("my_business_badge")}
        title={t("my_business_title")}
        subtitle={t("my_business_subtitle")}
      />

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

      <div>{activeTab === "my-info" ? <MyInfo /> : <MyPartnerList />}</div>
    </div>
  );
}
