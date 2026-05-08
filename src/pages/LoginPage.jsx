import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthInput from "@/components/AuthInput.jsx";
import SquareButton from "@/components/SquareButton.jsx";
import PillButton from "@/components/PillButton.jsx";
import worldMap from "@/assets/world-map.png";
import { useLogin } from "@/hooks/useAuth";
import { useI18n } from "@/lib/i18n/I18nProvider";

function HeroText() {
  const { t } = useI18n();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 60,
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "center",
        }}
      >
        <p
          style={{
            background:
              "linear-gradient(90deg, #0056ee 0%, #3e83ff 50%, #8ab4ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: 20,
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.4,
            textAlign: "center",
          }}
        >
          {t("landing_tagline")}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#080616",
              margin: 0,
              lineHeight: 1.4,
              textAlign: "center",
            }}
          >
            {t("landing_hero_line1")}
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {t("landing_hero_prefix") && (
              <p
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  color: "#080616",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {t("landing_hero_prefix")}
              </p>
            )}
            <div
              style={{
                background: "#0056ee",
                padding: "2px 8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  color: "#fafafa",
                  margin: 0,
                  lineHeight: 1.4,
                  whiteSpace: "nowrap",
                }}
              >
                {t("landing_hero_highlight")}
              </p>
            </div>
            {t("landing_hero_suffix") && (
              <p
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  color: "#080616",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {t("landing_hero_suffix")}
              </p>
            )}
          </div>
        </div>
      </div>

      <p
        style={{
          fontSize: 16,
          color: "#818181",
          margin: 0,
          lineHeight: 1.4,
          textAlign: "center",
        }}
      >
        {t("landing_description")}
      </p>
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (isPending || !email.trim() || !password.trim()) return;
    login({ email, password });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      style={{
        background: "#f4f7fc",
        minHeight: "calc(100vh - 68px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        alt=""
        aria-hidden
        src={worldMap}
        style={{
          position: "fixed",
          top: 68,
          left: 0,
          width: "100%",
          height: "calc(100vh - 68px)",
          objectFit: "cover",
          opacity: 0.3,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(2.5px)",
          background:
            "linear-gradient(to right, rgba(244,247,252,0) 35%, #f4f7fc 65%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1440,
          margin: "0 auto",
          display: "flex",
          minHeight: "calc(100vh - 68px)",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "201px 97px 80px 80px",
            display: "flex",
            flexDirection: "column",
            gap: 160,
            alignItems: "center",
          }}
        >
          <HeroText />

          <div
            style={{
              display: "flex",
              gap: 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: 16,
                color: "#080616",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {t("login_no_account")}
            </span>
            <SquareButton
              variant="outline"
              onClick={() => navigate("/register")}
            >
              {t("landing_join")}
            </SquareButton>
          </div>
        </div>

        <div
          style={{
            width: 752,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            padding: "60px 0 60px 100px",
            minHeight: "calc(100vh - 68px)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              width: 475,
            }}
          >
            <h1
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: "#080616",
                margin: 0,
                lineHeight: "58px",
              }}
            >
              {t("login_title")}
            </h1>
            <p
              style={{
                fontSize: 24,
                color: "#a2a0a0",
                margin: 0,
                lineHeight: "30px",
              }}
            >
              {t("login_subtitle")}
            </p>
          </div>

          <div
            style={{
              marginTop: 120,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              width: 520,
            }}
          >
            <AuthInput
              label={t("login_email_label")}
              placeholder="kstatra@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              icon={Mail}
            />
            <AuthInput
              label={t("login_password_label")}
              placeholder={t("login_password_placeholder")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div style={{ marginTop: "auto", paddingTop: 40, width: 520 }}>
            <PillButton
              variant="primary"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? t("login_pending") : t("landing_login")}
            </PillButton>
          </div>
        </div>
      </div>
    </div>
  );
}
