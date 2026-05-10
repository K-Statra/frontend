export default function PageHero({ badge, title, subtitle }) {
  return (
    <div style={{ background: "#f4f7fc" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          padding: "40px 80px",
        }}
      >
        <div
          style={{
            border: "0.5px solid #0056ee",
            borderRadius: 999,
            padding: "8px 12px",
            background: "#f4f7fc",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 500, color: "#0056ee" }}>
            {badge}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#080616",
              textAlign: "center",
              lineHeight: "38px",
            }}
          >
            {title}
          </span>
          <span style={{ fontSize: 16, color: "#a2a0a0" }}>{subtitle}</span>
        </div>
      </div>
    </div>
  );
}
