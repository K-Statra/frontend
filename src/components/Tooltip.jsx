import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Tooltip({ content, children }) {
  const [visible, setVisible] = useState(false);

  if (!content) return children;

  return (
    <div
      style={{ position: "relative", width: "100%", minWidth: 0 }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#1a1a2e",
              color: "#fafafa",
              fontSize: 12,
              lineHeight: "18px",
              padding: "6px 10px",
              borderRadius: 6,
              whiteSpace: "normal",
              wordBreak: "break-word",
              width: "max-content",
              maxWidth: 400,
              zIndex: 9999,
              pointerEvents: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
