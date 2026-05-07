import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import { useI18n } from "@/lib/i18n/I18nProvider.jsx";
import { track } from "@/lib/analytics.js";
import { Toaster } from "react-hot-toast";
import AppRouter from "@/router.jsx";

export default function App() {
  const { t } = useI18n();
  const location = useLocation();

  useEffect(() => {
    track("page_view", { path: location.pathname });
  }, [location]);

  return (
    <div>
      <a className="skip-link" href="#main-content">
        {t("skip_to_content")}
      </a>
      <Header />
      <main
        id="main-content"
        className={
          ["/", "/login", "/register"].includes(location.pathname)
            ? ""
            : "container"
        }
      >
        <AppRouter />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
