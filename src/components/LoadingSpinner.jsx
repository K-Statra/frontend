import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px 0",
        background: "#f4f7fc",
      }}
    >
      <motion.div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "3px solid #e8ecf0",
          borderTopColor: "#0056ee",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
