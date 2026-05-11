export default function WalletAddressField({ label, value, isLoading }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 12, color: "#a2a0a0", fontWeight: 500 }}>
          {label}
        </span>
        <span style={{ fontSize: 12, color: "#e8014a", fontWeight: 500 }}>
          *
        </span>
      </div>
      <div
        style={{
          background: "#f4f4f4",
          borderRadius: 12,
          height: 48,
          display: "flex",
          alignItems: "center",
          padding: "12px 20px",
        }}
      >
        <span
          style={{
            fontSize: 16,
            color: isLoading ? "#a2a0a0" : "#080616",
            lineHeight: "22px",
            wordBreak: "break-all",
          }}
        >
          {isLoading ? "..." : value || "-"}
        </span>
      </div>
    </div>
  );
}
