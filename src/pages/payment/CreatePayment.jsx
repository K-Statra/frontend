import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import StepProgressBar from "@/components/StepProgressBar";
import PaymentSelectPartner from "@/pages/payment/PaymentSelectPartner";
import PaymentVerifyInfo from "@/pages/payment/PaymentVerifyInfo";
import PaymentRequestForm from "@/pages/payment/PaymentRequestForm";

export default function CreatePayment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPartner, setSelectedPartner] = useState(null);
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

  const goNext = () => setStep((s) => Math.min(s + 1, 3));
  const goBack = () => {
    if (step === 1) navigate(-1);
    else setStep((s) => s - 1);
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
          Add Create Payment
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

      {step === 1 && (
        <PaymentSelectPartner
          selectedPartner={selectedPartner}
          onSelect={setSelectedPartner}
          onNext={goNext}
        />
      )}
      {step === 2 && (
        <PaymentVerifyInfo
          partner={selectedPartner}
          onBack={goBack}
          onNext={goNext}
        />
      )}
      {step === 3 && (
        <PaymentRequestForm
          partner={selectedPartner}
          milestones={milestones}
          onMilestonesChange={setMilestones}
          onBack={goBack}
        />
      )}
    </div>
  );
}
