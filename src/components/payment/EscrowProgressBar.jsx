import { motion } from "framer-motion";

const MAX_STEPS = 3;
const ACTIVE_COLOR = "#0056ee";
const PENDING_COLOR = "#dadada";
const ACTIVE_LABEL_COLOR = "#080616";
const EASE = [0.16, 1, 0.3, 1];
const STEP_DELAY = 0.18;

export default function EscrowProgressBar({
  steps,
  currentStep = 0,
  labels = [],
}) {
  const total = Math.min(Math.max(steps ?? 0, 1), MAX_STEPS);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum <= currentStep;
        const isLastStep = i === total - 1;
        const nextIsActive = stepNum < currentStep;

        return (
          <div
            key={stepNum}
            style={{
              display: "flex",
              alignItems: "flex-start",
              flex: isLastStep ? "0 0 auto" : "1 1 0",
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                width: 43,
                flexShrink: 0,
              }}
            >
              <motion.div
                initial={{ scale: 0.5, backgroundColor: PENDING_COLOR }}
                animate={{
                  scale: 1,
                  backgroundColor: isActive ? ACTIVE_COLOR : PENDING_COLOR,
                }}
                transition={{
                  duration: 0.4,
                  delay: i * STEP_DELAY,
                  ease: EASE,
                }}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 9999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 500,
                  lineHeight: 1,
                  color: "#fafafa",
                }}
              >
                {stepNum}
              </motion.div>
              <motion.span
                initial={{ opacity: 0, color: PENDING_COLOR }}
                animate={{
                  opacity: 1,
                  color: isActive ? ACTIVE_LABEL_COLOR : PENDING_COLOR,
                }}
                transition={{
                  duration: 0.35,
                  delay: i * STEP_DELAY + 0.1,
                  ease: EASE,
                }}
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  lineHeight: "12px",
                  textAlign: "center",
                  maxWidth: 80,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {labels[i] ?? `Step ${stepNum}`}
              </motion.span>
            </div>

            {!isLastStep && (
              <div
                style={{
                  flex: 1,
                  height: 1,
                  marginTop: 9.5,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderTop: `1px dashed ${PENDING_COLOR}`,
                  }}
                />
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{
                    clipPath: nextIsActive
                      ? "inset(0 0% 0 0)"
                      : "inset(0 100% 0 0)",
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * STEP_DELAY + 0.12,
                    ease: EASE,
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderTop: `1px dashed ${ACTIVE_COLOR}`,
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
