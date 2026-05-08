import { useState } from "react";

export default function AuthInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  onKeyDown,
  icon: Icon,
}) {
  const [showPw, setShowPw] = useState(false);
  const [focused, setFocused] = useState(false);
  const isPassword = type === "password";

  return (
    <div
      style={{
        background: "#fafafa",
        border: focused ? "1px solid #3e83ff" : "1px solid #dadada",
        borderRadius: 12,
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: "100%",
        boxSizing: "border-box",
        transition: "border-color 0.15s",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: focused ? "#0056ee" : "#a2a0a0",
            fontWeight: 500,
            lineHeight: "16px",
            transition: "color 0.15s",
          }}
        >
          {label}
        </span>
        <input
          type={isPassword && showPw ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: 16,
            color: "#080616",
            lineHeight: "22px",
            padding: 0,
            width: "100%",
          }}
        />
      </div>
      {Icon && !isPassword && (
        <Icon
          size={20}
          color={focused ? "#0056ee" : "#a2a0a0"}
          strokeWidth={1.5}
          style={{ flexShrink: 0, transition: "color 0.15s" }}
        />
      )}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPw((v) => !v)}
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            color: focused ? "#0056ee" : "#a2a0a0",
            flexShrink: 0,
            transition: "color 0.15s",
          }}
        >
          {showPw ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
