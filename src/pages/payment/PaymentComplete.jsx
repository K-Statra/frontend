import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import SquareButton from "@/components/SquareButton";

export default function PaymentComplete() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 0",
        gap: 32,
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
      >
        <CheckCircle size={80} color="#0056ee" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 700, color: "#080616" }}>
          {t("payment_complete_title")}
        </span>
        <span style={{ fontSize: 15, color: "#a2a0a0", textAlign: "center" }}>
          {t("payment_complete_subtitle")}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <SquareButton variant="primary" onClick={() => navigate("/payments")}>
          {t("payment_complete_go_payments")}
        </SquareButton>
      </motion.div>
    </div>
  );
}
