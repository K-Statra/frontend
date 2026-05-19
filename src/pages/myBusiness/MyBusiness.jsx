import { useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import PageHero from "@/components/shared/PageHero";
import SegmentedControl from "@/components/shared/SegmentedControl";
import MyInfo from "@/components/myBusiness/MyInfo";
import MyPartnerList from "@/components/myBusiness/MyPartnerList";

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
        <SegmentedControl
          tabs={[
            { value: "my-info", label: t("my_business_tab_my_info") },
            { value: "partner-list", label: t("my_business_tab_partner_list") },
          ]}
          value={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div>{activeTab === "my-info" ? <MyInfo /> : <MyPartnerList />}</div>
    </div>
  );
}
