import { Phone, Mail, Tag, FileText, Link } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import LabeledInput from "@/components/LabeledInput";
import AuthDropdown from "@/components/AuthDropdown";
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
  const companyIntro =
    data?.sellerIntroduction || data?.buyerIntroduction || data?.intro_en || "";
  const productIntro = data?.productIntroduction || data?.product_intro || "";
  const websiteUrl = data?.websiteUrl || data?.website || "";

  return (
    <div style={{ padding: "40px 80px 80px" }}>
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
            readOnly
          />
          <LabeledInput
            label={t("payment_buyer_wallet_label")}
            value={walletAddress}
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
          <LabeledInput
            label={t("register_company_intro_label")}
            value={companyIntro}
            icon={FileText}
            readOnly
          />
          <LabeledInput
            label={t("register_product_intro_label")}
            value={productIntro}
            icon={FileText}
            readOnly
          />
          <LabeledInput
            label={t("register_website_label")}
            type="url"
            value={websiteUrl}
            icon={Link}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
