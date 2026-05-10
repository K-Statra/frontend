import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/I18nProvider";
import StepProgressBar from "@/components/payment/StepProgressBar";
import PaymentSelectPartner from "@/pages/payment/PaymentSelectPartner";
import PaymentVerifyInfo from "@/pages/payment/PaymentVerifyInfo";
import PaymentRequestForm from "@/pages/payment/PaymentRequestForm";

const variants = {
  initial: (dir) => ({ x: dir * 80, opacity: 0 }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 28 },
  },
  exit: (dir) => ({
    x: dir * -80,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  }),
};

export default function CreatePayment() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [sellerWalletAddress, setSellerWalletAddress] = useState("");
  const [milestones, setMilestones] = useState([
    {
      id: Date.now(),
      milestonePayment: "",
      xrplAmount: "",
      xrplCurrency: "",
      xrplPercent: "",
      triggers: [""],
    },
  ]);

  const goNext = () => {
    setDir(1);
    setStep((s) => Math.min(s + 1, 3));
  };
  const goBack = () => {
    if (step === 1) {
      navigate(-1);
    } else {
      setDir(-1);
      setStep((s) => s - 1);
    }
  };

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>
      <div
        style={{
          background: "#f4f7fc",
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "32px 80px",
        }}
      >
        <button
          onClick={goBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: 0,
          }}
        >
          <ChevronLeft size={24} color="#080616" />
        </button>
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#0056ee",
            lineHeight: "30px",
          }}
        >
          {t("create_payment_title")}
        </span>
      </div>

      <div
        style={{
          background: "#f4f7fc",
          display: "flex",
          justifyContent: "center",
          padding: "40px 80px 80px",
        }}
      >
        <StepProgressBar currentStep={step} />
      </div>

      <div style={{ overflow: "hidden" }}>
        <AnimatePresence mode="popLayout" custom={dir}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={dir}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <PaymentSelectPartner
                selectedPartner={selectedPartner}
                onSelect={setSelectedPartner}
                onNext={goNext}
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={dir}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <PaymentVerifyInfo
                partner={selectedPartner}
                onBack={goBack}
                onNext={(addr) => {
                  setSellerWalletAddress(addr);
                  goNext();
                }}
              />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key="step3"
              custom={dir}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <PaymentRequestForm
                partner={selectedPartner}
                sellerWalletAddress={sellerWalletAddress}
                milestones={milestones}
                onMilestonesChange={setMilestones}
                onBack={goBack}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
