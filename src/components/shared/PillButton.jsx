export default function PillButton({
  children,
  onClick,
  variant = "dark",
  disabled = false,
  type = "button",
}) {
  const bg = disabled ? "#aaa" : variant === "primary" ? "#0056ee" : "#080616";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "12px 0",
        borderRadius: 999,
        background: bg,
        color: "#fafafa",
        fontSize: 16,
        fontWeight: 500,
        border: "none",
        cursor: disabled ? "default" : "pointer",
        transition: "background 0.2s",
      }}
    >
      {children}
    </button>
  );
}
