import { useState } from "react";
import { Search } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import SquareButton from "@/components/SquareButton";

export default function PartnerSearchInput({ onSearch, isLoading }) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim() || isLoading) return;
    onSearch(query.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      style={{
        background: "#fafafa",
        border: "1px solid #dadada",
        borderRadius: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "center",
          padding: 12,
          borderBottom: "1px solid #dadada",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: 12,
            background: "#fafafa",
          }}
        >
          <Search
            size={24}
            color="#a2a0a0"
            strokeWidth={1.5}
            style={{ flexShrink: 0 }}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("matches_search_placeholder")}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 16,
              color: "#080616",
              lineHeight: "24px",
              padding: 0,
              height: 24,
            }}
          />
        </div>
        <SquareButton
          variant="primary"
          onClick={handleSearch}
          disabled={isLoading}
          style={{ width: 152, padding: "12px 32px" }}
        >
          {t("search_button")}
        </SquareButton>
      </div>
    </div>
  );
}
