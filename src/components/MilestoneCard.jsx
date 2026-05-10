import { Trash2, Plus, X } from "lucide-react";

const MILESTONE_PAYMENT_OPTIONS = [
  "Advance Payment",
  "Upon Shipment",
  "Upon Delivery",
  "Upon Inspection",
  "Final Payment",
];

const CURRENCY_OPTIONS = ["XRP", "USD", "EUR"];

const selectStyle = {
  background: "#fafafa",
  border: "1px solid #dadada",
  borderRadius: 4,
  padding: "8px 12px",
  fontSize: 12,
  color: "#080616",
  outline: "none",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a2a0a0' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 8px center",
  paddingRight: 32,
};

const inputStyle = {
  background: "#fafafa",
  border: "1px solid #dadada",
  borderRadius: 4,
  padding: "8px 12px",
  fontSize: 12,
  color: "#080616",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

function RowLabel({ children }) {
  return (
    <div style={{ width: 172, flexShrink: 0 }}>
      <span style={{ fontSize: 14, fontWeight: 500, color: "#080616" }}>
        {children} <span style={{ color: "#e8014a" }}>*</span>
      </span>
    </div>
  );
}

export default function MilestoneCard({
  milestone,
  index,
  onChange,
  onDelete,
}) {
  const update = (field, value) => onChange({ ...milestone, [field]: value });

  const addTrigger = () =>
    onChange({ ...milestone, triggers: [...milestone.triggers, ""] });

  const removeTrigger = (i) =>
    onChange({
      ...milestone,
      triggers: milestone.triggers.filter((_, idx) => idx !== i),
    });

  const updateTrigger = (i, value) =>
    onChange({
      ...milestone,
      triggers: milestone.triggers.map((t, idx) => (idx === i ? value : t)),
    });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <span
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: "#080616",
          padding: "0 12px",
        }}
      >
        Milestone {index + 1}
      </span>
      <div
        style={{
          background: "#f3f3f3",
          borderRadius: 20,
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 100 }}>
            <RowLabel>Milestone Payment</RowLabel>
            <select
              value={milestone.milestonePayment}
              onChange={(e) => update("milestonePayment", e.target.value)}
              style={{ ...selectStyle, width: 260 }}
            >
              <option value="">Milestone Payment</option>
              {MILESTONE_PAYMENT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={onDelete}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#5693ff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Trash2 size={16} color="#fafafa" />
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 100 }}>
          <RowLabel>XRPL Pay</RowLabel>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input
              style={{ ...inputStyle, width: 260 }}
              placeholder="Amount"
              value={milestone.xrplAmount}
              onChange={(e) => update("xrplAmount", e.target.value)}
            />
            <select
              value={milestone.xrplCurrency}
              onChange={(e) => update("xrplCurrency", e.target.value)}
              style={{ ...selectStyle, width: 172 }}
            >
              {CURRENCY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div style={{ position: "relative", width: 172 }}>
              <input
                style={{ ...inputStyle, width: "100%", paddingRight: 28 }}
                placeholder="30"
                value={milestone.xrplPercent}
                onChange={(e) => update("xrplPercent", e.target.value)}
              />
              <span
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 12,
                  color: "#a2a0a0",
                  pointerEvents: "none",
                }}
              >
                %
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 100 }}>
          <RowLabel>Event Trigger</RowLabel>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              flex: 1,
            }}
          >
            {milestone.triggers.map((trigger, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <input
                  style={{ ...inputStyle, flex: 1, width: "auto" }}
                  placeholder={`Event ${i + 1}`}
                  value={trigger}
                  onChange={(e) => updateTrigger(i, e.target.value)}
                />
                {milestone.triggers.length > 1 && (
                  <button
                    onClick={() => removeTrigger(i)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      padding: 4,
                      color: "#a2a0a0",
                      flexShrink: 0,
                    }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addTrigger}
              style={{
                background: "none",
                border: "1px dashed #a2a0a0",
                borderRadius: 4,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                padding: "6px 12px",
                fontSize: 12,
                color: "#a2a0a0",
                alignSelf: "flex-start",
              }}
            >
              <Plus size={14} />
              Add trigger
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
