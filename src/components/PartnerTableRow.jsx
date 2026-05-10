import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PartnerTableRow({
  name,
  country,
  industries,
  profile,
  avatarUrl,
  websiteUrl,
  checked,
  onToggle,
}) {
  const industryText = Array.isArray(industries)
    ? industries.join(", ")
    : (industries ?? "");

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        alignItems: "center",
        padding: "12px 20px",
        borderBottom: "0.5px dashed #dadada",
      }}
    >
      <motion.div
        role="checkbox"
        aria-checked={checked}
        aria-label={`${name} 선택`}
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => (e.key === " " || e.key === "Enter") && onToggle()}
        whileTap={{ scale: 0.8 }}
        animate={{
          background: checked ? "#0056ee" : "transparent",
          border: checked ? "none" : "1px solid #a2a0a0",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        style={{
          width: 24,
          height: 24,
          flexShrink: 0,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <AnimatePresence>
          {checked && (
            <motion.span
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 18 }}
              style={{ display: "flex" }}
            >
              <Check size={16} color="#fafafa" strokeWidth={2.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <div
        style={{ display: "flex", flex: 1, alignItems: "center", minWidth: 0 }}
      >
        <div
          style={{
            width: 417,
            display: "flex",
            alignItems: "center",
            padding: "8px 20px",
            gap: 8,
          }}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                flexShrink: 0,
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#edf1f4",
                flexShrink: 0,
              }}
            />
          )}
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 12,
              color: "#080616",
              textDecoration: "underline",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
          >
            {name}
          </a>
        </div>

        <div
          style={{
            width: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 12px",
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "#080616",
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {country}
          </span>
        </div>

        <div
          style={{
            width: 197,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 12px",
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "#080616",
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {industryText}
          </span>
        </div>

        <div style={{ flex: 1, minWidth: 0, padding: "8px 12px" }}>
          <span
            style={{
              fontSize: 12,
              color: "#080616",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {profile}
          </span>
        </div>
      </div>
    </div>
  );
}
