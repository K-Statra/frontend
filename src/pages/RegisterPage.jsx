import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "../components/AuthInput.jsx";
import AuthDropdown from "../components/AuthDropdown.jsx";
import SquareButton from "../components/SquareButton.jsx";
import PillButton from "../components/PillButton.jsx";
import worldMap from "../assets/world-map.png";

const COMPANY_TYPES = [
  { value: "buyer", label: "Buyer" },
  { value: "seller", label: "Seller" },
  { value: "manufacturer", label: "Manufacturer" },
  { value: "distributor", label: "Distributor" },
];

const SOURCING_CATEGORIES = [
  { value: "electronics", label: "Electronics" },
  { value: "textiles", label: "Textiles" },
  { value: "food_beverage", label: "Food & Beverage" },
  { value: "machinery", label: "Machinery" },
  { value: "chemicals", label: "Chemicals" },
  { value: "other", label: "Other" },
];

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

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "",
    phone: "",
    email: "",
    companyType: "",
    sourcingCategories: "",
    companyProfile: "",
    websiteUrl: "",
  });

  const set = (key) => (eOrValue) =>
    setForm((f) => ({
      ...f,
      [key]: typeof eOrValue === "string" ? eOrValue : eOrValue.target.value,
    }));

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
              width: 552,
              display: "flex",
              flexDirection: "column",
              gap: 80,
            }}
          >
            {/* Title */}
            <div
              style={{
                width: 475,
                display: "flex",
                flexDirection: "column",
                gap: 12,
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

            {/* Form + Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 60 }}>
              {/* Form fields */}
              <div
                style={{
                  width: 520,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <AuthInput
                  label="Company name"
                  placeholder="statra company"
                  value={form.companyName}
                  onChange={set("companyName")}
                />
                <AuthInput
                  label="call"
                  placeholder="+82 00-0000-0000"
                  value={form.phone}
                  onChange={set("phone")}
                />
                <AuthInput
                  label="Email Address"
                  placeholder="kstatra@gmail.com"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                />
                <div style={{ display: "flex", gap: 16 }}>
                  <AuthDropdown
                    label="Company Type"
                    value={form.companyType}
                    onChange={set("companyType")}
                    options={COMPANY_TYPES}
                    placeholder="Buyer"
                  />
                  <AuthDropdown
                    label="Sourcing Categories"
                    value={form.sourcingCategories}
                    onChange={set("sourcingCategories")}
                    options={SOURCING_CATEGORIES}
                    placeholder="item keyword"
                  />
                </div>
                <AuthInput
                  label="Company profile"
                  placeholder="statra company"
                  value={form.companyProfile}
                  onChange={set("companyProfile")}
                />
                <AuthInput
                  label="Website URL"
                  placeholder="http://www.k-statra.com"
                  type="url"
                  value={form.websiteUrl}
                  onChange={set("websiteUrl")}
                />
              </div>

              {/* Buttons */}
              <div
                style={{
                  width: 520,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <PillButton variant="primary">Add Company</PillButton>
                <PillButton variant="dark">Next</PillButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
