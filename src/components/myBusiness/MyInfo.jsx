import { Phone, Mail, Tag, Building2, Wallet } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import LabeledInput from "@/components/shared/LabeledInput";
import AuthDropdown from "@/components/shared/AuthDropdown";
import { useMyProfile } from "@/hooks/myBusiness/useMyProfile";

export default function MyInfo() {
  const { t } = useI18n();
  const { data, isLoading } = useMyProfile();

  if (isLoading) return null;

  const companyName = data?.sellerName || data?.name_en || data?.name || "";
  const walletAddress = data?.wallet?.address || "";
  const phone = data?.representativePhone || data?.phone || "";
  const email = data?.representativeEmail || data?.email || "";
  const companyType = data?.type || "buyer";
  const keywords = (data?.needs || data?.exportItems || []).join(", ");

  return (
    <div
      style={{
        padding: "40px 80px 80px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 520,
          display: "flex",
          flexDirection: "column",
          gap: 60,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <LabeledInput
            label={t("register_company_label")}
            value={companyName}
            icon={Building2}
            readOnly
          />
          <LabeledInput
            label={t("my_info_wallet_label")}
            value={walletAddress}
            icon={Wallet}
            readOnly
          />
          <LabeledInput
            label={t("register_phone_label")}
            value={phone}
            icon={Phone}
            readOnly
          />
          <LabeledInput
            label={t("register_email_label")}
            type="email"
            value={email}
            icon={Mail}
            readOnly
          />
          <div style={{ display: "flex", gap: 16 }}>
            <AuthDropdown
              label={t("register_company_type_label")}
              value={companyType}
              onChange={() => {}}
              options={[
                { value: "buyer", label: t("register_type_buyer") },
                { value: "seller", label: t("register_type_seller") },
              ]}
              disabled
            />
            <div style={{ flex: 1 }}>
              <LabeledInput
                label={t("my_info_sourcing_label")}
                value={keywords}
                icon={Tag}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
