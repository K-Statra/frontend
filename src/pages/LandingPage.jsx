import { useNavigate } from "react-router-dom";
import SquareButton from "@/components/SquareButton.jsx";
import worldMap from "@/assets/world-map.png";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function LandingPage() {
  const navigate = useNavigate();
  const { t } = useI18n();

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
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(2.5px)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1440,
          margin: "0 auto",
          padding: "201px 80px",
          display: "flex",
          flexDirection: "column",
          gap: 160,
          alignItems: "center",
        }}
      >
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
                      textAlign: "center",
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

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <SquareButton variant="outline" onClick={() => navigate("/login")}>
            {t("landing_login")}
          </SquareButton>
          <SquareButton variant="solid" onClick={() => navigate("/register")}>
            {t("landing_join")}
          </SquareButton>
        </div>
      </div>
    </div>
  );
}
