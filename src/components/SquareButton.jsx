export default function SquareButton({
  children,
  onClick,
  variant = "outline",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background: variant === "solid" ? "#080616" : "#fafafa",
        color: variant === "solid" ? "#fafafa" : "#080616",
        border: variant === "outline" ? "1px solid #080616" : "none",
        borderRadius: 8,
        width: 200,
        padding: "12px 0",
        fontSize: 16,
        fontWeight: 500,
        cursor: "pointer",
        flexShrink: 0,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}
