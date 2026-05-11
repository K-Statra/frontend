import { CreditCard } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useMyProfile } from "@/hooks/myBusiness/useMyProfile";
import WalletAddressField from "@/components/payment/WalletAddressField";

export default function WalletAddressCard({ sellerWalletAddress }) {
  const { t } = useI18n();
  const { data, isLoading } = useMyProfile();

  const buyerWalletAddress = data?.wallet?.address || "";

  return (
    <div
      style={{
        borderBottom: "1px dashed #a2a0a0",
        padding: "32px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <CreditCard size={24} color="#080616" strokeWidth={1.5} />
        <span style={{ fontSize: 16, fontWeight: 500, color: "#080616" }}>
          {t("payment_xrp_info_title")}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <WalletAddressField
          label={t("payment_buyer_wallet_label")}
          value={buyerWalletAddress}
          isLoading={isLoading}
        />
        <WalletAddressField
          label={t("payment_seller_wallet_label")}
          value={sellerWalletAddress}
        />
      </div>
    </div>
  );
}
