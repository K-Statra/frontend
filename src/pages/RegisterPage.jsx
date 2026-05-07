import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  User,
  Phone,
  Mail,
  Tag,
  FileText,
  Package,
  Link,
} from "lucide-react";
import AuthInput from "@/components/AuthInput.jsx";
import SquareButton from "@/components/SquareButton.jsx";
import PillButton from "@/components/PillButton.jsx";
import worldMap from "@/assets/world-map.png";

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

function TypeToggle({ value, onChange }) {
  const options = [
    { value: "buyer", label: "바이어" },
    { value: "seller", label: "국내수출 업체" },
  ];
  return (
    <div
      style={{
        display: "flex",
        background: "#f0f4ff",
        borderRadius: 999,
        padding: 4,
        gap: 4,
        width: "100%",
      }}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          style={{
            flex: 1,
            padding: "10px 0",
            borderRadius: 999,
            background: value === opt.value ? "#0056ee" : "transparent",
            color: value === opt.value ? "#fafafa" : "#a2a0a0",
            border: "none",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.15s, color 0.15s",
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [companyType, setCompanyType] = useState("buyer");
  const [form, setForm] = useState({
    companyName: "",
    representativeName: "",
    email: "",
    phone: "",
    password: "",
    keywords: "",
    companyIntro: "",
    productIntro: "",
    websiteUrl: "",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const isBuyer = companyType === "buyer";

  const isValid =
    form.companyName.trim() &&
    form.representativeName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.password.trim() &&
    form.keywords.trim() &&
    form.companyIntro.trim() &&
    form.productIntro.trim();

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
        {/* Left panel */}
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
              Already have an account?
            </span>
            <SquareButton variant="outline" onClick={() => navigate("/login")}>
              Log in
            </SquareButton>
          </div>
        </div>

        {/* Right panel */}
        <div
          style={{
            width: 752,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 100px",
          }}
        >
          <div
            style={{
              width: 520,
              display: "flex",
              flexDirection: "column",
              gap: 40,
            }}
          >
            {/* Title */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h1
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: "#080616",
                  margin: 0,
                  lineHeight: "58px",
                }}
              >
                welcome to K-Statra!
              </h1>
              <p
                style={{
                  fontSize: 24,
                  color: "#a2a0a0",
                  margin: 0,
                  lineHeight: "30px",
                }}
              >
                Register your account
              </p>
            </div>

            {/* Type toggle */}
            <TypeToggle value={companyType} onChange={setCompanyType} />

            {/* Form fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <AuthInput
                label="회사명"
                placeholder="K-Statra Inc."
                value={form.companyName}
                onChange={set("companyName")}
                icon={Building2}
              />
              <AuthInput
                label="비밀번호"
                placeholder="8자 이상 입력해주세요"
                type="password"
                value={form.password}
                onChange={set("password")}
              />
              <AuthInput
                label="대표자명"
                placeholder="홍길동"
                value={form.representativeName}
                onChange={set("representativeName")}
                icon={User}
              />
              <AuthInput
                label="이메일"
                placeholder="kstatra@gmail.com"
                type="email"
                value={form.email}
                onChange={set("email")}
                icon={Mail}
              />
              <AuthInput
                label="전화번호"
                placeholder="+82 10-0000-0000"
                value={form.phone}
                onChange={set("phone")}
                icon={Phone}
              />
              <AuthInput
                label={isBuyer ? "관심 소싱 품목" : "수출 희망 품목"}
                placeholder={
                  isBuyer
                    ? "예: K-Beauty, 화장품, 스킨케어"
                    : "예: 스마트팩토리, Industrial IoT"
                }
                value={form.keywords}
                onChange={set("keywords")}
                icon={Tag}
              />
              <AuthInput
                label="회사 소개서"
                placeholder="회사에 대해 간략히 소개해주세요"
                value={form.companyIntro}
                onChange={set("companyIntro")}
                icon={FileText}
              />
              <AuthInput
                label="제품 소개서"
                placeholder={
                  isBuyer
                    ? "관심 있는 제품/서비스를 설명해주세요"
                    : "주력 제품/서비스를 설명해주세요"
                }
                value={form.productIntro}
                onChange={set("productIntro")}
                icon={Package}
              />
              <AuthInput
                label="웹사이트 URL"
                placeholder="https://www.k-statra.com"
                type="url"
                value={form.websiteUrl}
                onChange={set("websiteUrl")}
                icon={Link}
              />
            </div>

            {/* Submit button */}
            <PillButton variant="primary" disabled={!isValid}>
              회원가입
            </PillButton>
          </div>
        </div>
      </div>
    </div>
  );
}
