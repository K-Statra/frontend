import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Tooltip from "@/components/shared/Tooltip";

export default function PartnerTableRow({
  name,
  country,
  industries,
  profile,
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
          <Tooltip content={name}>
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
                display: "block",
              }}
            >
              {name}
            </a>
          </Tooltip>
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
          <Tooltip content={country}>
            <span
              style={{
                fontSize: 12,
                color: "#080616",
                textAlign: "center",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "block",
              }}
            >
              {country}
            </span>
          </Tooltip>
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
          <Tooltip content={industryText}>
            <span
              style={{
                fontSize: 12,
                color: "#080616",
                textAlign: "center",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "block",
              }}
            >
              {industryText}
            </span>
          </Tooltip>
        </div>

        <div style={{ flex: 1, minWidth: 0, padding: "8px 12px" }}>
          <Tooltip content={profile}>
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
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
