import { Trash2, Plus, X, Layers } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import RowLabel from "@/components/payment/RowLabel";

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

export default function EscrowInfoCard({
  milestone,
  index,
  onChange,
  onDelete,
}) {
  const { t } = useI18n();

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
      triggers: milestone.triggers.map((trigger, idx) =>
        idx === i ? value : trigger,
      ),
    });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 12px",
        }}
      >
        <Layers size={24} color="#080616" strokeWidth={1.5} />
        <span style={{ fontSize: 16, fontWeight: 500, color: "#080616" }}>
          {t("payment_escrow_info_label")} {index + 1}
        </span>
      </div>
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
            <RowLabel>{t("payment_memo_label")}</RowLabel>
            <input
              style={{ ...inputStyle, width: 260 }}
              placeholder="ex) 1차 수출 대금"
              value={milestone.memo}
              onChange={(e) => update("memo", e.target.value)}
            />
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
          <RowLabel>{t("payment_escrow_label")}</RowLabel>
          <input
            value={milestone.label}
            onChange={(e) => update("label", e.target.value)}
            placeholder="ex) 초기금"
            style={{ ...inputStyle, width: 260 }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 100 }}>
          <RowLabel>{t("payment_currency_label")}</RowLabel>
          <div style={{ display: "flex", gap: 8 }}>
            {["XRP", "RLUSD"].map((c) => (
              <button
                key={c}
                onClick={() => update("currency", c)}
                style={{
                  padding: "6px 20px",
                  borderRadius: 6,
                  border:
                    milestone.currency === c ? "none" : "1px solid #dadada",
                  background: milestone.currency === c ? "#0056ee" : "#fafafa",
                  color: milestone.currency === c ? "#fafafa" : "#a2a0a0",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 100 }}>
          <RowLabel>{t("payment_xrpl_pay")}</RowLabel>
          <input
            style={{ ...inputStyle, width: 260 }}
            placeholder={t("payment_amount_placeholder")}
            value={milestone.xrplAmount}
            onChange={(e) => update("xrplAmount", e.target.value)}
          />
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 100 }}>
          <RowLabel>{t("payment_event_trigger")}</RowLabel>
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
              {t("payment_add_trigger")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
