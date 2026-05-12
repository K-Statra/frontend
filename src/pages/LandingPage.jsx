import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SquareButton from "@/components/SquareButton.jsx";
import worldMap from "@/assets/world-map.png";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useAuthStore } from "@/stores/authStore";

const EASE = [0.16, 1, 0.3, 1];

function fadeUp(delay) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  };
}

export default function LandingPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { isLoggedIn } = useAuthStore();

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
            <motion.p
              {...fadeUp(0.1)}
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
            </motion.p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                alignItems: "center",
              }}
            >
              <motion.p
                {...fadeUp(0.25)}
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
              </motion.p>

              <motion.div
                {...fadeUp(0.4)}
                style={{ display: "flex", gap: 12, alignItems: "center" }}
              >
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
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0 0 0)" }}
                  transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
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
                </motion.div>
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
              </motion.div>
            </div>
          </div>

          <motion.p
            {...fadeUp(0.7)}
            style={{
              fontSize: 16,
              color: "#818181",
              margin: 0,
              lineHeight: 1.4,
              textAlign: "center",
              whiteSpace: "pre-line",
            }}
          >
            {t("landing_description")}
          </motion.p>
        </div>

        <motion.div
          {...fadeUp(0.9)}
          style={{ display: "flex", gap: 32, alignItems: "center" }}
        >
          {isLoggedIn ? (
            <SquareButton variant="solid" onClick={() => navigate("/matches")}>
              {t("nav_partner_matching")}
            </SquareButton>
          ) : (
            <>
              <SquareButton
                variant="outline"
                onClick={() => navigate("/login")}
              >
                {t("landing_login")}
              </SquareButton>
              <SquareButton
                variant="solid"
                onClick={() => navigate("/register")}
              >
                {t("landing_join")}
              </SquareButton>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
