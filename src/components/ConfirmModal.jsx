import { useEffect } from "react";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  isPending,
  title,
  subtitle,
  cancelLabel,
  confirmLabel,
  pendingLabel,
}) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && !isPending) onClose?.();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, isPending]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
      onClick={isPending ? undefined : onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 411,
          background: "#fafafa",
          borderRadius: 32,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 60,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9999,
              background: "#f5b81f",
              color: "#fafafa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            !
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#080616",
                lineHeight: "30px",
              }}
            >
              {title}
            </span>
            {subtitle && (
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  color: "#080616",
                  lineHeight: "22px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {subtitle}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={isPending ? undefined : onClose}
            disabled={isPending}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              border: "none",
              background: "#080616",
              color: "#fafafa",
              fontSize: 16,
              fontWeight: 700,
              lineHeight: "22px",
              cursor: isPending ? "default" : "pointer",
              opacity: isPending ? 0.6 : 1,
            }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={isPending ? undefined : onConfirm}
            disabled={isPending}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              border: "none",
              background: "#0056ee",
              color: "#fafafa",
              fontSize: 16,
              fontWeight: 700,
              lineHeight: "22px",
              cursor: isPending ? "default" : "pointer",
              opacity: isPending ? 0.6 : 1,
            }}
          >
            {isPending ? pendingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
