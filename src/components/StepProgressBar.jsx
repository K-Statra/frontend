const STEPS = [
  { label: "Select a Partner" },
  { label: "Verify Company Info" },
  { label: "Request Payment" },
];

export default function StepProgressBar({ currentStep }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        justifyContent: "center",
      }}
    >
      {STEPS.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        const isConnectorActive = stepNumber < currentStep;

        return (
          <div
            key={stepNumber}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  position: "relative",
                  display: "inline-grid",
                  placeItems: "start",
                }}
              >
                {isActive && (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "rgba(0, 86, 238, 0.2)",
                      filter: "blur(0.5px)",
                      gridColumn: 1,
                      gridRow: 1,
                    }}
                  />
                )}
                <div
                  style={{
                    width: isActive ? 28 : 28,
                    height: isActive ? 28 : 28,
                    borderRadius: "50%",
                    background: isActive ? "#0056ee" : "#fafafa",
                    border: isActive ? "none" : "1px solid #dadada",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gridColumn: 1,
                    gridRow: 1,
                    marginTop: isActive ? 2 : 0,
                    marginLeft: isActive ? 2 : 0,
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: isActive ? "#fafafa" : "#a2a0a0",
                      lineHeight: "22px",
                    }}
                  >
                    {stepNumber}
                  </span>
                </div>
              </div>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: isActive ? "#080616" : "#a2a0a0",
                  whiteSpace: "nowrap",
                  lineHeight: "22px",
                }}
              >
                {step.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div
                style={{
                  width: 80,
                  height: 2,
                  background: isConnectorActive ? "#0056ee" : "#dadada",
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
