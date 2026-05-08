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
import { useRegister } from "@/hooks/useAuth";
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

function TypeToggle({ value, onChange }) {
  const { t } = useI18n();
  const options = [
    { value: "buyer", label: t("register_type_buyer") },
    { value: "seller", label: t("register_type_seller") },
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
  const { mutate: register, isPending, error } = useRegister();
  const { t } = useI18n();
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

  const handleTypeChange = (type) => {
    setCompanyType(type);
    setForm({
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
  };

  const isBuyer = companyType === "buyer";

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const passwordValid = form.password.length >= 8;
  const websiteValid =
    !form.websiteUrl.trim() || /^https?:\/\/.+/.test(form.websiteUrl.trim());

  const isValid =
    form.companyName.trim() &&
    form.representativeName.trim() &&
    emailValid &&
    form.phone.trim() &&
    passwordValid &&
    form.keywords.trim() &&
    form.companyIntro.trim() &&
    form.productIntro.trim() &&
    websiteValid;

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
              {t("register_has_account")}
            </span>
            <SquareButton variant="outline" onClick={() => navigate("/login")}>
              {t("landing_login")}
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
                {t("register_title")}
              </h1>
              <p
                style={{
                  fontSize: 24,
                  color: "#a2a0a0",
                  margin: 0,
                  lineHeight: "30px",
                }}
              >
                {t("register_subtitle")}
              </p>
            </div>

            {/* Type toggle */}
            <TypeToggle value={companyType} onChange={handleTypeChange} />

            {/* Form fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <AuthInput
                label={t("register_company_label")}
                placeholder={t("register_company_placeholder")}
                value={form.companyName}
                onChange={set("companyName")}
                icon={Building2}
              />
              <AuthInput
                label={t("register_password_label")}
                placeholder={t("register_password_placeholder")}
                type="password"
                value={form.password}
                onChange={set("password")}
              />
              <AuthInput
                label={t("register_rep_label")}
                placeholder={t("register_rep_placeholder")}
                value={form.representativeName}
                onChange={set("representativeName")}
                icon={User}
              />
              <AuthInput
                label={t("register_email_label")}
                placeholder="kstatra@gmail.com"
                type="email"
                value={form.email}
                onChange={set("email")}
                icon={Mail}
              />
              <AuthInput
                label={t("register_phone_label")}
                placeholder={t("register_phone_placeholder")}
                value={form.phone}
                onChange={set("phone")}
                icon={Phone}
              />
              <AuthInput
                label={
                  isBuyer
                    ? t("register_keywords_buyer_label")
                    : t("register_keywords_seller_label")
                }
                placeholder={
                  isBuyer
                    ? t("register_keywords_buyer_placeholder")
                    : t("register_keywords_seller_placeholder")
                }
                value={form.keywords}
                onChange={set("keywords")}
                icon={Tag}
              />
              <AuthInput
                label={t("register_company_intro_label")}
                placeholder={t("register_company_intro_placeholder")}
                value={form.companyIntro}
                onChange={set("companyIntro")}
                icon={FileText}
              />
              <AuthInput
                label={t("register_product_intro_label")}
                placeholder={
                  isBuyer
                    ? t("register_product_buyer_placeholder")
                    : t("register_product_seller_placeholder")
                }
                value={form.productIntro}
                onChange={set("productIntro")}
                icon={Package}
              />
              <AuthInput
                label={t("register_website_label")}
                placeholder="https://www.k-statra.com"
                type="url"
                value={form.websiteUrl}
                onChange={set("websiteUrl")}
                icon={Link}
              />
            </div>

            {/* Submit button */}
            {error && (
              <p style={{ color: "#e53e3e", fontSize: 14 }}>
                {t("register_error")}
              </p>
            )}
            <PillButton
              variant="primary"
              disabled={!isValid || isPending}
              onClick={() => {
                const keywords = form.keywords
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean);
                register({
                  type: companyType,
                  sellerName: form.companyName,
                  representativeName: form.representativeName,
                  representativeEmail: form.email,
                  representativePhone: form.phone,
                  password: form.password,
                  sellerIntroduction: form.companyIntro,
                  productIntroduction: form.productIntro,
                  websiteUrl: form.websiteUrl || undefined,
                  ...(isBuyer
                    ? { needs: keywords }
                    : { exportItems: keywords }),
                });
              }}
            >
              {isPending ? t("register_pending") : t("register_button")}
            </PillButton>
          </div>
        </div>
      </div>
    </div>
  );
}
