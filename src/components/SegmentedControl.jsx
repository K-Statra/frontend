import { motion } from "framer-motion";

export default function SegmentedControl({ tabs, value, onChange }) {
  return (
    <div
      style={{
        background: "#edf1f4",
        borderRadius: 8,
        height: 40,
        display: "inline-flex",
        padding: 4,
        gap: 0,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          style={{
            position: "relative",
            padding: "4px 12px",
            borderRadius: 8,
            border: "none",
            background: "transparent",
            fontSize: 16,
            fontWeight: 500,
            color: "#080616",
            cursor: "pointer",
            whiteSpace: "nowrap",
            zIndex: 1,
          }}
        >
          {value === tab.value && (
            <motion.div
              layoutId="tab-indicator"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 8,
                background: "#fafafa",
                border: "none",
                zIndex: -1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
