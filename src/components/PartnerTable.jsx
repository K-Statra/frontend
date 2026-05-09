import { useState } from "react";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useI18n } from "@/lib/i18n/I18nProvider";
import PartnerTableRow from "@/components/PartnerTableRow";

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" },
  }),
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

const TABLE_HEADERS = [
  { key: "company", width: 417 },
  { key: "country", width: 180 },
  { key: "industries", width: 197 },
  { key: "profile", width: null },
];

export default function PartnerTable({ partners, isFetching, submittedQuery }) {
  const { t } = useI18n();
  const [checkedIds, setCheckedIds] = useState(new Set());

  const allChecked = partners.length > 0 && checkedIds.size === partners.length;

  const toggleAll = () => {
    if (allChecked) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(partners.map((p, i) => p._id ?? i)));
    }
  };

  const toggleOne = (id) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
          padding: "0 20px",
          background: "#edf1f4",
        }}
      >
        <motion.div
          onClick={toggleAll}
          whileTap={{ scale: 0.8 }}
          animate={{
            background: allChecked ? "#0056ee" : "transparent",
            border: allChecked ? "none" : "1px solid #a2a0a0",
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
            {allChecked && (
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
        <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
          {TABLE_HEADERS.map(({ key, width }) => (
            <div
              key={key}
              style={{
                width: width ?? undefined,
                flex: width ? undefined : 1,
                padding: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#434055",
                  whiteSpace: "nowrap",
                }}
              >
                {t(`matches_col_${key}`)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {partners.map((partner, i) => {
          const id = partner._id ?? i;
          return (
            <motion.div
              key={id}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <PartnerTableRow
                name={partner.name}
                country={partner.location?.country}
                industries={partner.industry}
                profile={partner.profileText}
                websiteUrl={partner.websiteUrl}
                avatarUrl={partner.profileImageUrl}
                checked={checkedIds.has(id)}
                onToggle={() => toggleOne(id)}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {!submittedQuery && (
        <div
          style={{
            padding: "40px 0",
            textAlign: "center",
            fontSize: 14,
            color: "#a2a0a0",
          }}
        >
          {t("matches_empty_prompt")}
        </div>
      )}

      {!isFetching && submittedQuery && partners.length === 0 && (
        <div
          style={{
            padding: "40px 0",
            textAlign: "center",
            fontSize: 14,
            color: "#a2a0a0",
          }}
        >
          {t("matches_no_results")}
        </div>
      )}
    </div>
  );
}
