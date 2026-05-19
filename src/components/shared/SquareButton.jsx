export default function SquareButton({
  children,
  onClick,
  variant = "outline",
  type = "button",
  disabled = false,
  style: styleProp,
}) {
  const bg =
    variant === "solid"
      ? "#080616"
      : variant === "primary"
        ? "#0056ee"
        : "#fafafa";
  const color = variant === "outline" ? "#080616" : "#fafafa";
  const border = variant === "outline" ? "1px solid #080616" : "none";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="hover:shadow-md transition-shadow duration-150"
      style={{
        background: bg,
        color,
        border,
        borderRadius: 8,
        width: 200,
        padding: "12px 0",
        fontSize: 16,
        fontWeight: 500,
        cursor: disabled ? "default" : "pointer",
        flexShrink: 0,
        whiteSpace: "nowrap",
        ...styleProp,
      }}
    >
      {children}
    </button>
  );
}
