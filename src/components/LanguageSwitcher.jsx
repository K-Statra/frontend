import { Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  const toggle = () => setLang(lang === "ko" ? "en" : "ko");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle language"
      style={{
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        color: "#080616",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#e8edf5")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <Globe size={32} strokeWidth={1.5} />
    </button>
  );
}
