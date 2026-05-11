export default function RowLabel({ children }) {
  return (
    <div style={{ width: 172, flexShrink: 0 }}>
      <span style={{ fontSize: 14, fontWeight: 500, color: "#080616" }}>
        {children} <span style={{ color: "#e8014a" }}>*</span>
      </span>
    </div>
  );
}
