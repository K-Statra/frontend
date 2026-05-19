import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { SiInstagram, SiYoutube } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { useI18n } from "@/lib/i18n/I18nProvider";
import footerLogoIcon from "@/assets/footer_logo_icon.svg";
import footerLogoText from "@/assets/footer_logo_text.svg";

const NAV_COLUMNS = [
  {
    titleKey: "nav_partner_matching",
    links: [{ labelKey: "search_button", to: "/matches" }],
  },
  {
    titleKey: "nav_xrp_payment",
    links: [
      { labelKey: "payments_total_received", to: "/payments" },
      { labelKey: "payments_total_sent", to: "/payments" },
      { labelKey: "payments_new_payment", to: "/payments" },
    ],
  },
  {
    titleKey: "nav_my_business",
    links: [
      { labelKey: "my_business_tab_my_info", to: "/my-business" },
      { labelKey: "my_business_tab_partner_list", to: "/my-business" },
    ],
  },
];

const BOTTOM_LINKS = {
  en: ["Terms of Use", "Privacy Policy", "Partnership"],
  ko: ["이용약관", "개인정보 처리방침", "제휴 신청"],
};

export default function Footer() {
  const { t, lang } = useI18n();
  const bottomLinks = lang === "ko" ? BOTTOM_LINKS.ko : BOTTOM_LINKS.en;

  return (
    <footer style={{ background: "#f4f7fc", padding: "40px" }}>
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          background: "rgba(8,6,22,0.75)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          borderRadius: 60,
          height: 540,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 69,
            width: 342,
            display: "flex",
            flexDirection: "column",
            gap: 40,
          }}
        >
          <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
            <div
              style={{
                width: 60,
                height: 60,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
              }}
            >
              <img
                src={footerLogoIcon}
                alt=""
                style={{ width: 48, height: 36 }}
              />
              <img
                src={footerLogoText}
                alt=""
                style={{ width: 48, height: 9 }}
              />
            </div>
            <p
              style={{
                color: "#fafafa",
                fontSize: 16,
                lineHeight: "22px",
                margin: 0,
              }}
            >
              {t("about_subheading")}
            </p>
          </div>

          <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{ display: "flex", color: "#fafafa" }}
            >
              <SiInstagram size={19} />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{ display: "flex", color: "#fafafa" }}
            >
              <SiYoutube size={21} />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{ display: "flex", color: "#fafafa" }}
            >
              <FaLinkedinIn size={19} />
            </a>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 513,
            top: 85,
            display: "flex",
            gap: 40,
          }}
        >
          {NAV_COLUMNS.map((col) => (
            <div
              key={col.titleKey}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 40,
                minWidth: 120,
              }}
            >
              <span
                style={{
                  color: "#fafafa",
                  fontSize: 20,
                  fontWeight: 700,
                  lineHeight: "24px",
                }}
              >
                {t(col.titleKey)}
              </span>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                {col.links.map((link) => (
                  <Link
                    key={link.labelKey}
                    to={link.to}
                    style={{
                      color: "#fafafa",
                      fontSize: 16,
                      lineHeight: "22px",
                      textDecoration: "none",
                    }}
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <span
              style={{
                color: "#fafafa",
                fontSize: 20,
                fontWeight: 700,
                lineHeight: "24px",
              }}
            >
              {t("about_contact_title")}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <Mail
                  size={20}
                  color="#fafafa"
                  strokeWidth={1.5}
                  style={{ flexShrink: 0 }}
                />
                <span
                  style={{ color: "#fafafa", fontSize: 16, lineHeight: "22px" }}
                >
                  k-statra@gmail.com
                </span>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <Phone
                  size={20}
                  color="#fafafa"
                  strokeWidth={1.5}
                  style={{ flexShrink: 0 }}
                />
                <span
                  style={{ color: "#fafafa", fontSize: 16, lineHeight: "22px" }}
                >
                  (02) 123 - 4567
                </span>
              </div>
              <div
                style={{ display: "flex", gap: 8, alignItems: "flex-start" }}
              >
                <MapPin
                  size={20}
                  color="#fafafa"
                  strokeWidth={1.5}
                  style={{ flexShrink: 0, marginTop: 2 }}
                />
                <span
                  style={{
                    color: "#fafafa",
                    fontSize: 16,
                    lineHeight: "22px",
                    width: 219,
                  }}
                >
                  203, Buil-ro, Wonmi-gu, Bucheon-si, Gyeonggi-do, Republic of
                  Korea
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: 416,
            width: 1241,
            height: 1,
            background: "rgba(255,255,255,0.2)",
          }}
        />

        <span
          style={{
            position: "absolute",
            left: 71,
            top: 441,
            color: "#fafafa",
            fontSize: 20,
            lineHeight: "24px",
          }}
        >
          Copyright © Gran Oso All Rights Reserved.
        </span>

        <div
          style={{
            position: "absolute",
            right: 71,
            top: 453,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {bottomLinks.map((label, i) => (
            <span
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  color: "#fafafa",
                  fontSize: 20,
                  lineHeight: "24px",
                  textDecoration: "none",
                }}
              >
                {label}
              </a>
              {i < bottomLinks.length - 1 && (
                <span style={{ color: "#fafafa", fontSize: 20 }}>|</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
