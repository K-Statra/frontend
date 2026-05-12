const MAX_STEPS = 3;
const ACTIVE_COLOR = "#0056ee";
const PENDING_COLOR = "#dadada";
const ACTIVE_LABEL_COLOR = "#080616";

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
        const circleColor = isActive ? ACTIVE_COLOR : PENDING_COLOR;
        const isLastStep = i === total - 1;
        const nextIsActive = stepNum < currentStep;
        const lineColor = nextIsActive ? ACTIVE_COLOR : PENDING_COLOR;

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
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 9999,
                  background: circleColor,
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
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  lineHeight: "12px",
                  color: isActive ? ACTIVE_LABEL_COLOR : PENDING_COLOR,
                  textAlign: "center",
                  maxWidth: 80,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {labels[i] ?? `Step ${stepNum}`}
              </span>
            </div>

            {!isLastStep && (
              <div
                style={{
                  flex: 1,
                  height: 1,
                  marginTop: 9.5,
                  borderTop: `1px dashed ${lineColor}`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
