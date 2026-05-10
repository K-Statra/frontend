import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import SquareButton from "@/components/SquareButton";
import MilestoneCard from "@/components/payment/MilestoneCard";
import { useAuthStore } from "@/stores/authStore";
import { useCreateEscrowPayment } from "@/hooks/payments/useCreateEscrowPayment";

export default function PaymentRequestForm({
  partner,
  sellerWalletAddress,
  milestones,
  onMilestonesChange,
  onBack,
}) {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const { companyId, role } = useAuthStore();
  const { mutateAsync, isPending } = useCreateEscrowPayment();

  const handleChange = (index, updated) => {
    onMilestonesChange(milestones.map((m, i) => (i === index ? updated : m)));
  };

  const handleDelete = (index) => {
    if (milestones.length === 1) return;
    onMilestonesChange(milestones.filter((_, i) => i !== index));
  };

  const handleAddMilestone = () => {
    onMilestonesChange([
      ...milestones,
      {
        id: Date.now(),
        milestonePayment: "",
        xrplAmount: "",
        xrplCurrency: "XRP",
        xrplPercent: "",
        triggers: [""],
      },
    ]);
  };

  const handleSubmit = async () => {
    const isBuyer = role === "buyer";
    const buyerId = isBuyer ? companyId : partner._id;

    const escrows = milestones.map((m, index) => ({
      label: m.milestonePayment,
      amountXrp: parseFloat(m.xrplAmount) || 0,
      order: index,
      requiredEventTypes: m.triggers.filter((t) => t.trim() !== ""),
    }));

    const currency = milestones[0]?.xrplCurrency === "RLUSD" ? "RLUSD" : "XRP";

    await mutateAsync({ buyerId, sellerWalletAddress, currency, escrows });
    toast.success("결제 요청이 생성되었습니다.");
    navigate("/payments");
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div
        style={{
          maxWidth: 1056,
          margin: "0 auto",
          padding: "40px 0",
          display: "flex",
          flexDirection: "column",
          gap: 100,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {milestones.map((milestone, index) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              index={index}
              onChange={(updated) => handleChange(index, updated)}
              onDelete={() => handleDelete(index)}
            />
          ))}

          <button
            onClick={handleAddMilestone}
            style={{
              background: "none",
              border: "1px dashed #a2a0a0",
              borderRadius: 8,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px 0",
              fontSize: 14,
              color: "#a2a0a0",
              width: "100%",
            }}
          >
            <Plus size={16} />
            Add Milestone
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            justifyContent: "center",
          }}
        >
          <motion.div
            role="checkbox"
            aria-checked={confirmed}
            aria-label="All payment request details have been confirmed"
            tabIndex={0}
            onClick={() => setConfirmed((v) => !v)}
            onKeyDown={(e) =>
              (e.key === " " || e.key === "Enter") && setConfirmed((v) => !v)
            }
            whileTap={{ scale: 0.8 }}
            animate={{
              background: confirmed ? "#0056ee" : "transparent",
              border: confirmed ? "none" : "1px solid #a2a0a0",
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
              {confirmed && (
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
            All payment request details have been confirmed
          </span>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <SquareButton variant="outline" onClick={onBack} disabled={isPending}>
          Back
        </SquareButton>
        <SquareButton
          variant="primary"
          disabled={!confirmed || isPending}
          onClick={handleSubmit}
        >
          {isPending ? "Processing..." : "Next"}
        </SquareButton>
      </div>
    </div>
  );
}
