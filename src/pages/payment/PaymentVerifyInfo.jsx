import { useState } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n/I18nProvider";
import SquareButton from "@/components/SquareButton";
import LabeledInput from "@/components/LabeledInput";

export default function PaymentVerifyInfo({ partner, onBack, onNext }) {
  const { t } = useI18n();
  const [verified, setVerified] = useState(false);
  const [walletAddress, setWalletAddress] = useState(
    partner?.walletAddress ?? "",
  );

  return (
    <div style={{ paddingBottom: 80 }}>
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          padding: "40px 0",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 16, fontWeight: 500, color: "#080616" }}>
            {t("payment_company_info_title")}
          </span>
          <LabeledInput
            label={t("payment_wallet_address_label")}
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <motion.div
            role="checkbox"
            aria-checked={verified}
            aria-label="Company info verified"
            tabIndex={0}
            onClick={() => setVerified((v) => !v)}
            onKeyDown={(e) =>
              (e.key === " " || e.key === "Enter") && setVerified((v) => !v)
            }
            whileTap={{ scale: 0.8 }}
            animate={{
              background: verified ? "#0056ee" : "transparent",
              border: verified ? "none" : "1px solid #a2a0a0",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
              width: 24,
              height: 24,
              flexShrink: 0,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <AnimatePresence>
              {verified && (
                <motion.span
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  style={{ display: "flex" }}
                >
                  <Check size={16} color="#fafafa" strokeWidth={2.5} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
          <span style={{ fontSize: 16, fontWeight: 500, color: "#a2a0a0" }}>
            {t("payment_company_verified")}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <SquareButton variant="outline" onClick={onBack}>
          {t("payment_back")}
        </SquareButton>
        <SquareButton
          variant="primary"
          disabled={!verified || !walletAddress.trim()}
          onClick={() => onNext(walletAddress)}
        >
          {t("payment_next")}
        </SquareButton>
      </div>
    </div>
  );
}
