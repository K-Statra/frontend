import { useNavigate } from "react-router-dom";
import SquareButton from "@/components/SquareButton.jsx";
import worldMap from "@/assets/world-map.png";

export default function LandingPage() {
  const navigate = useNavigate();

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
              Find faster, Trade safer
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
                Match Buyers
              </p>

              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <p
                  style={{
                    fontSize: 56,
                    fontWeight: 700,
                    color: "#080616",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  with
                </p>
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
                    Trusted Sellers
                  </p>
                </div>
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
            Find trusted partners with AI-powered matching and experience
            faster,
            <br />
            more efficient B2B transactions with XRP.
          </p>
        </div>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <SquareButton variant="outline" onClick={() => navigate("/login")}>
            Log in
          </SquareButton>
          <SquareButton variant="solid" onClick={() => navigate("/register")}>
            Join us
          </SquareButton>
        </div>
      </div>
    </div>
  );
}
