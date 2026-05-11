import { motion } from "framer-motion";

const shimmerStyle = {
  background: "linear-gradient(90deg, #ececec 25%, #d8d8d8 50%, #ececec 75%)",
  backgroundSize: "200% 100%",
};

function SkeletonBlock({ width, height = 12, style }) {
  return (
    <motion.div
      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      style={{
        ...shimmerStyle,
        width,
        height,
        borderRadius: 6,
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

function SkeletonRow() {
  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        alignItems: "center",
        padding: "16px 20px",
        borderBottom: "0.5px dashed #dadada",
      }}
    >
      <SkeletonBlock width={24} height={24} style={{ borderRadius: 4 }} />
      <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
        <div style={{ width: 417, padding: "8px 20px" }}>
          <SkeletonBlock width="55%" />
        </div>
        <div
          style={{
            width: 180,
            padding: "8px 12px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SkeletonBlock width="60%" />
        </div>
        <div
          style={{
            width: 197,
            padding: "8px 12px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SkeletonBlock width="70%" />
        </div>
        <div
          style={{
            flex: 1,
            padding: "8px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <SkeletonBlock width="90%" />
          <SkeletonBlock width="60%" />
        </div>
      </div>
    </div>
  );
}

export default function PartnerTableSkeleton({ rows = 7 }) {
  return (
    <div>
      {Array.from({ length: rows }, (_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}
