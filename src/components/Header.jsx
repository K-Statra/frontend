import { Link, NavLink } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher.jsx";
import { useI18n } from "@/lib/i18n/I18nProvider.jsx";
import { track } from "@/lib/analytics.js";

const navItems = [
  { to: "/partners", key: "nav_partner_matching" },
  { to: "/payments", key: "nav_xrp_payment" },
  { to: "/overview", key: "nav_my_business" },
];

export default function Header() {
  const { t } = useI18n();

  return (
    <header className="header">
      <div className="inner">
        <div className="header-top">
          <Link to="/" className="brand-link">
            K-Statra
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
          <div className="control-group" aria-label="Language selector">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
