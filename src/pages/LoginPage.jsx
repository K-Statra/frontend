import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthInput from "@/components/AuthInput.jsx";
import SquareButton from "@/components/SquareButton.jsx";
import PillButton from "@/components/PillButton.jsx";
import worldMap from "@/assets/world-map.png";
import { authApi } from "@/apis/modules/auth";
import { useAuthStore } from "@/stores/authStore";

function HeroText() {
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
        Find trusted partners with AI-powered matching and experience faster,
        <br />
        more efficient B2B transactions with XRP.
      </p>
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isValid = email.trim() && password.trim();

  const handleLogin = async () => {
    try {
      const res = await authApi.login({ email, password });
      const { companyId, companyName, role } = res.data;
      setAuth(companyId, companyName, role);
      navigate("/");
    } catch {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
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
              Don&apos;t have an account?
            </span>
            <SquareButton
              variant="outline"
              onClick={() => navigate("/register")}
            >
              Join us
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
              welcome back!
            </h1>
            <p
              style={{
                fontSize: 24,
                color: "#a2a0a0",
                margin: 0,
                lineHeight: "30px",
              }}
            >
              Log in to your account
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
              label="이메일"
              placeholder="kstatra@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
            />
            <AuthInput
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "auto", paddingTop: 40, width: 520 }}>
            {error && (
              <p style={{ color: "#e53e3e", fontSize: 14, marginBottom: 12 }}>
                {error}
              </p>
            )}
            <PillButton
              variant="primary"
              disabled={!isValid}
              onClick={handleLogin}
            >
              Log in
            </PillButton>
          </div>
        </div>
      </div>
    </div>
  );
}
