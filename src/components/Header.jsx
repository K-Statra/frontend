import { Link, NavLink } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher.jsx";
import { useI18n } from "@/lib/i18n/I18nProvider.jsx";
import { track } from "@/lib/analytics.js";
import logoTypo from "@/assets/logo_typo.png";

const navItems = [
  { to: "/matches", key: "nav_partner_matching" },
  { to: "/payments/create", key: "nav_xrp_payment" },
  { to: "/overview", key: "nav_my_business" },
];

export default function Header() {
  const { t } = useI18n();

  return (
    <header className="header">
      <div className="inner">
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <Link to="/" className="brand-link">
            <img src={logoTypo} alt="K-Statra" style={{ height: 28 }} />
          </Link>
          <nav className="nav" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? "active" : undefined)}
                onClick={() => track("nav_click", { target: item.to })}
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
