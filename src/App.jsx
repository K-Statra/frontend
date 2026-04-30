import { useEffect, useState } from "react";
import { buyersApi } from "./apis";
import { useAuthStore } from "./stores/authStore.js";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import LanguageSwitcher from "./components/LanguageSwitcher.jsx";
import Button from "./components/Button.jsx";
import Modal from "./components/Modal.jsx";
import Footer from "./components/Footer.jsx";
import { useI18n } from "./lib/i18n/I18nProvider.jsx";
import { track } from "./lib/analytics.js";
import { Toaster } from "react-hot-toast";
import AppRouter from "./router.jsx";

const navItems = [
  { to: "/overview", key: "nav_overview" },
  { to: "/partners", key: "nav_my_partners" },
  { to: "/schedule", key: "nav_schedule" },
  { to: "/payments", key: "nav_payments" },
  { to: "/about", key: "nav_about" },
];

export default function App() {
  const { t, lang } = useI18n();
  const { setAuth, loginModalOpen, closeLoginModal } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (loginModalOpen) {
      setLoginOpen(true);
      closeLoginModal();
    }
  }, [loginModalOpen, closeLoginModal]);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    remember: true,
  });
  const [ipSecure, setIpSecure] = useState(false);
  const [loginStatus, setLoginStatus] = useState({
    submitting: false,
    success: false,
    error: "",
  });
  const [signupOpen, setSignupOpen] = useState(false);

  useEffect(() => {
    track("page_view", { path: location.pathname });
  }, [location]);

  const loginTabs =
    lang === "ko"
      ? [
          { id: "id", label: "ID/전화번호" },
          { id: "one-time", label: "일회용 번호" },
          { id: "qr", label: "QR코드" },
        ]
      : [
          { id: "id", label: "ID / Phone" },
          { id: "one-time", label: "One-time number" },
          { id: "qr", label: "QR code" },
        ];
  const loginLabel = lang === "ko" ? "로그인" : "Log In";
  const signupLabel = lang === "ko" ? "회원가입" : "Sign Up";
  const personalSignupLabel =
    lang === "ko" ? "개인 회원가입" : "Personal Sign-up";
  const companySignupLabel =
    lang === "ko" ? "기업 회원가입" : "Company Sign-up";
  const signupDescription =
    lang === "ko"
      ? "가입 유형을 선택해 주세요."
      : "Choose the option that fits you best.";
  const usernameLabel =
    lang === "ko" ? "아이디 또는 전화번호" : "ID or phone number";
  const passwordLabel = lang === "ko" ? "비밀번호" : "Password";
  const rememberLabel = lang === "ko" ? "로그인 상태 유지" : "Stay signed in";
  const ipLabel = lang === "ko" ? "IP보안" : "IP security";
  const loginErrorMessage =
    lang === "ko"
      ? "아이디와 비밀번호를 모두 입력해 주세요."
      : "Enter both ID and password.";
  const loginSuccessMessage =
    lang === "ko"
      ? "임시 로그인 성공! (데모 화면)"
      : "Temporary login success! (demo)";
  const openLoginModal = () => {
    setLoginStatus({ submitting: false, success: false, error: "" });
    setIpSecure(false);
    setLoginOpen(true);
    track("login_modal_open");
  };

  const openSignupModal = () => {
    setSignupOpen(true);
    track("signup_modal_open");
  };

  const handlePersonalSignup = () => {
    setSignupOpen(false);
    track("signup_choice", { type: "personal" });
    navigate("/buyers/new");
  };

  const handleCompanySignup = () => {
    setSignupOpen(false);
    track("signup_choice", { type: "company" });
    navigate("/companies/new");
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (!loginForm.username.trim() || !loginForm.password.trim()) {
      setLoginStatus({
        submitting: false,
        success: false,
        error: loginErrorMessage,
      });
      return;
    }
    setLoginStatus({ submitting: true, success: false, error: "" });
    track("login_modal_submit");

    try {
      const res = await buyersApi.list({ limit: 1 });
      const buyer = res?.data?.[0];

      if (buyer) {
        setAuth(buyer._id, buyer.name);
        setLoginStatus({ submitting: false, success: true, error: "" });
        setTimeout(() => setLoginOpen(false), 1000);
      } else {
        setLoginStatus({
          submitting: false,
          success: true,
          error: "Demo login (no buyers found)",
        });
      }
    } catch (_) {
      setLoginStatus({ submitting: false, success: false, error: "" });
    }
  };

  return (
    <div>
      <a className="skip-link" href="#main-content">
        {t("skip_to_content")}
      </a>
      <header className="header">
        <div className="inner">
          <div className="header-top">
            <div className="brand">
              <span className="logo-box" aria-hidden="true">
                K
              </span>
              <Link to="/" className="brand-link">
                K-Statra
              </Link>
            </div>
            <nav className="nav" aria-label="Primary">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                  onClick={() => track("nav_click", { target: item.to })}
                >
                  {t(item.key)}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="controls-row">
            <div className="control-group" aria-label="Language selector">
              <span className="control-icon" aria-hidden="true">
                🌐
              </span>
              <LanguageSwitcher />
            </div>
            <button
              className="avatar-btn"
              type="button"
              aria-label={signupLabel}
              onClick={openSignupModal}
              style={{
                borderRadius: "999px",
                padding: "0.2rem 0.6rem",
                minWidth: lang === "ko" ? 64 : 76,
                fontSize: "0.8rem",
                textTransform: "none",
                fontWeight: 600,
                background: "#fff",
                color: "#111",
                border: "1px solid #d5dae0",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  minWidth: lang === "ko" ? "4em" : "4.5em",
                  textAlign: "center",
                }}
              >
                {signupLabel}
              </span>
            </button>
            <button
              className="avatar-btn"
              type="button"
              aria-label={loginLabel}
              onClick={openLoginModal}
              style={{
                borderRadius: "999px",
                padding: "0.2rem 0.8rem",
                minWidth: lang === "ko" ? 64 : 76,
                fontSize: "0.8rem",
                textTransform: "none",
                fontWeight: 600,
                background: "var(--accent)",
                color: "#fff",
                border: "none",
                boxShadow: "0 2px 8px rgba(47, 47, 228, 0.2)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  minWidth: lang === "ko" ? "3.5em" : "4em",
                  textAlign: "center",
                }}
              >
                {loginLabel}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" className="container">
        <AppRouter />
      </main>
      <Footer />
      <Toaster position="top-right" />

      <Modal
        open={loginOpen}
        onClose={() => {
          setLoginOpen(false);
          setIpSecure(false);
          setLoginStatus({ submitting: false, success: false, error: "" });
        }}
        title={loginLabel}
        footer={
          <Button
            variant="secondary"
            onClick={() => {
              setLoginOpen(false);
              setIpSecure(false);
              setLoginStatus({ submitting: false, success: false, error: "" });
            }}
          >
            Close
          </Button>
        }
      >
        <div
          className="login-modal"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "0.5rem",
          }}
        >
          <div
            className="login-logo"
            style={{ fontSize: "28px", fontWeight: 700, textAlign: "center" }}
          >
            {loginLabel}
          </div>
          <div
            className="login-tabs"
            role="tablist"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "4px",
              background: "#f3f4f6",
              borderRadius: "8px",
            }}
          >
            {loginTabs.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                className={`login-tab ${index === 0 ? "active" : ""}`}
                aria-selected={index === 0}
                style={{
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border:
                    index === 0 ? "1px solid #03c75a" : "1px solid transparent",
                  background: index === 0 ? "#fff" : "transparent",
                  fontWeight: index === 0 ? 600 : 500,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form
            className="login-form"
            onSubmit={handleLoginSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <label className="filter-group">
              <span>{usernameLabel}</span>
              <input
                value={loginForm.username}
                placeholder=""
                autoComplete="username"
                onChange={(event) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    username: event.target.value,
                  }))
                }
              />
            </label>
            <label className="filter-group">
              <span>{passwordLabel}</span>
              <input
                type="password"
                value={loginForm.password}
                placeholder=""
                autoComplete="current-password"
                onChange={(event) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
              />
            </label>

            <div
              className="login-options row space"
              style={{ fontSize: "0.9rem", alignItems: "center" }}
            >
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={loginForm.remember}
                  onChange={(event) =>
                    setLoginForm((prev) => ({
                      ...prev,
                      remember: event.target.checked,
                    }))
                  }
                />
                <span>{rememberLabel}</span>
              </label>
              <div className="ip-sec">
                <span>{ipLabel}</span>
                <button
                  type="button"
                  className={`ip-toggle ${ipSecure ? "on" : "off"}`}
                  style={{
                    marginLeft: "0.5rem",
                    borderRadius: "999px",
                    padding: "0.15rem 0.75rem",
                    border: "1px solid #d1d5db",
                    background: ipSecure ? "#03c75a" : "#f9fafb",
                    color: ipSecure ? "#fff" : "#374151",
                  }}
                  onClick={() => setIpSecure((prev) => !prev)}
                >
                  {ipSecure ? "ON" : "OFF"}
                </button>
              </div>
            </div>

            {loginStatus.error && (
              <div className="error" role="alert">
                {loginStatus.error}
              </div>
            )}
            {loginStatus.success && (
              <p className="success small">{loginSuccessMessage}</p>
            )}
            <Button
              type="submit"
              loading={loginStatus.submitting}
              style={{ width: "100%" }}
            >
              {loginLabel}
            </Button>
          </form>
        </div>
      </Modal>
      <Modal
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
        title={signupLabel}
        footer={
          <Button variant="secondary" onClick={() => setSignupOpen(false)}>
            Close
          </Button>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p className="muted">{signupDescription}</p>
          <div
            className="signup-options"
            style={{ display: "grid", gap: "0.75rem" }}
          >
            <div
              style={{
                padding: "1rem",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                background: "#fafafa",
              }}
            >
              <h4 style={{ marginBottom: "0.25rem" }}>{personalSignupLabel}</h4>
              <p className="muted small" style={{ marginBottom: "0.75rem" }}>
                {lang === "ko"
                  ? "매칭 피드를 받아보고 싶다면 개인 회원으로 가입해 주세요."
                  : "Sign up as an individual to get curated partner recommendations."}
              </p>
              <Button style={{ width: "100%" }} onClick={handlePersonalSignup}>
                {personalSignupLabel}
              </Button>
            </div>
            <div
              style={{
                padding: "1rem",
                borderRadius: "12px",
                border: "1px solid #c7d2fe",
                background: "#eef2ff",
              }}
            >
              <h4 style={{ marginBottom: "0.25rem" }}>{companySignupLabel}</h4>
              <p className="muted small" style={{ marginBottom: "0.75rem" }}>
                {lang === "ko"
                  ? "회사 정보를 등록하면 AI 추천 카드에 노출됩니다."
                  : "Add your company details to appear in AI recommendations."}
              </p>
              <Button style={{ width: "100%" }} onClick={handleCompanySignup}>
                {companySignupLabel}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
