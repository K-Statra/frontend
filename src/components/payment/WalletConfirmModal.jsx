import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n/I18nProvider";
import SquareButton from "@/components/shared/SquareButton";
import { useWalletUser } from "@/hooks/payments/useWalletUser";

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "12px 0",
        borderBottom: "0.5px solid #f0f0f0",
      }}
    >
      <span style={{ fontSize: 11, color: "#a2a0a0", fontWeight: 500 }}>
        {label}
      </span>
      <span style={{ fontSize: 14, color: "#080616", lineHeight: "20px" }}>
        {value}
      </span>
    </div>
  );
}

export default function WalletConfirmModal({ address, onConfirm, onCancel }) {
  const { t } = useI18n();
  const { data, isLoading, isError } = useWalletUser(address);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCancel();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const name = data?.name_en || data?.name_kr || data?.name || "-";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onCancel}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(8,6,22,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9000,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fafafa",
            borderRadius: 20,
            padding: 32,
            width: 480,
            maxWidth: "90vw",
            boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#080616" }}>
              {t("payment_wallet_confirm_title")}
            </span>
          </div>

          {isLoading && (
            <div
              style={{
                padding: "32px 0",
                textAlign: "center",
                color: "#a2a0a0",
                fontSize: 14,
              }}
            >
              {t("payment_wallet_loading")}
            </div>
          )}

          {isError && (
            <div
              style={{
                padding: "32px 0",
                textAlign: "center",
                color: "#e8014a",
                fontSize: 14,
              }}
            >
              {t("payment_wallet_not_found")}
            </div>
          )}

          {!isLoading && !isError && data && (
            <div style={{ marginBottom: 24 }}>
              <InfoRow
                label={t("payment_wallet_address_label")}
                value={address}
              />
              <InfoRow label={t("payment_wallet_company_name")} value={name} />
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <SquareButton variant="outline" onClick={onCancel}>
              {t("payment_wallet_no")}
            </SquareButton>
            <SquareButton
              variant="primary"
              onClick={onConfirm}
              disabled={isLoading || isError}
            >
              {t("payment_wallet_yes")}
            </SquareButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
