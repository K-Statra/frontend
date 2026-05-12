import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider.jsx";
import PageHero from "@/components/PageHero";
import SegmentedControl from "@/components/SegmentedControl.jsx";
import LoadingSpinner from "@/components/LoadingSpinner.jsx";
import { useEscrowPaymentList } from "@/hooks/payments/useEscrowPayments";
import PaymentDetail from "@/pages/payment/PaymentDetail.jsx";
import EscrowProgressBar from "@/components/payment/EscrowProgressBar";

const STATUS_TEXT = {
  PENDING_APPROVAL: "awaiting",
  APPROVED: "in_progress",
};

const ROW_EASE = [0.16, 1, 0.3, 1];

const PROGRESS_BAR_STATUSES = ["PROCESSING", "ACTIVE"];
const ACTIVE_ITEM_STATUSES = [
  "SUBMITTING",
  "ESCROWED",
  "RELEASING",
  "RELEASED",
];

function AmountCell({ amount, currency }) {
  if (amount == null)
    return <span style={{ fontSize: 12, color: "#080616" }}>-</span>;
  return (
    <span style={{ fontSize: 12, color: "#080616" }}>
      {amount.toLocaleString()}
      <span style={{ color: "#e8014a", fontWeight: 700 }}>
        {" "}
        {currency ?? "XRP"}
      </span>
    </span>
  );
}

function PaymentRow({ item, isSelected, onClick, index = 0 }) {
  const { t } = useI18n();
  const counterparty = item.partnerName ?? "-";
  const date = item.createdAt
    ? new Date(item.createdAt)
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\. /g, " / ")
        .replace(/\.$/, "")
    : "-";
  const escrows = Array.isArray(item.escrows) ? item.escrows : [];

  let progressContent;
  if (item.status === "COMPLETED") {
    progressContent = t("payments_status_finished");
  } else if (item.status === "CANCELLED") {
    progressContent = t("payments_status_cancelled");
  } else if (
    PROGRESS_BAR_STATUSES.includes(item.status) &&
    escrows.length > 0
  ) {
    const sortedEscrows = [...escrows].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    );
    const steps = Math.min(sortedEscrows.length, 3);
    let activeCount = 0;
    for (const e of sortedEscrows.slice(0, steps)) {
      if (e.status === "RELEASED") {
        activeCount++;
      } else if (ACTIVE_ITEM_STATUSES.includes(e.status)) {
        activeCount++;
        break;
      } else {
        break;
      }
    }
    const labels = sortedEscrows.slice(0, steps).map((e) => e.label ?? "");
    progressContent = (
      <EscrowProgressBar
        steps={steps}
        currentStep={activeCount}
        labels={labels}
      />
    );
  } else {
    const statusKey = STATUS_TEXT[item.status] ?? "awaiting";
    progressContent =
      statusKey === "in_progress"
        ? t("payments_status_in_progress")
        : t("payments_status_awaiting");
  }

  return (
    <motion.tr
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: ROW_EASE,
      }}
      style={{
        cursor: "pointer",
        background: isSelected ? "#ecf3ff" : "transparent",
      }}
    >
      <td style={{ ...tdStyle, width: 114, textAlign: "center" }}>{date}</td>
      <td style={{ ...tdStyle, width: 152 }}>{counterparty ?? "-"}</td>
      <td style={{ ...tdStyle, width: 123, textAlign: "center" }}>
        <AmountCell amount={item.totalAmountXrp} currency={item.currency} />
      </td>
      <td style={{ ...tdStyle, textAlign: "center", color: "#a2a0a0" }}>
        {progressContent}
      </td>
    </motion.tr>
  );
}

const thStyle = {
  padding: "12px 8px",
  fontSize: 14,
  fontWeight: 500,
  color: "#434055",
  textAlign: "center",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "20px 12px",
  fontSize: 12,
  color: "#080616",
  borderBottom: "1px dashed #dadada",
};

export default function PaymentsPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [tab, setTab] = useState("ongoing");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const limit = 10;

  const { data, isLoading, isError, refetch } = useEscrowPaymentList(
    tab,
    page,
    limit,
  );

  const items = Array.isArray(data) ? data : (data?.data ?? data?.items ?? []);
  const total = Array.isArray(data) ? data.length : (data?.total ?? 0);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  function handleTabChange(val) {
    setTab(val);
    setPage(1);
    setSelectedId(null);
  }

  return (
    <div style={{ background: "#fafafa" }}>
      <PageHero
        badge={t("nav_xrp_payment")}
        title={t("payments_hero_title")}
        subtitle={t("payments_hero_subtitle")}
      />

      <div style={{ display: "flex", minHeight: "calc(100vh - 68px - 252px)" }}>
        <div
          style={{
            flex: 1,
            borderRight: "0.5px dashed #a2a0a0",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "40px 44px 20px 80px",
            }}
          >
            <SegmentedControl
              tabs={[
                { value: "ongoing", label: t("payments_tab_ongoing") },
                { value: "done", label: t("payments_tab_done") },
              ]}
              value={tab}
              onChange={handleTabChange}
            />
            <button
              onClick={() => navigate("/payments/create")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "8px 16px",
                background: "#0056ee",
                color: "#fafafa",
                border: "none",
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <Plus size={24} color="#fafafa" />
              {t("payments_add_create")}
            </button>
          </div>

          <div style={{ paddingLeft: 80, paddingRight: 40, flex: 1 }}>
            {isLoading ? (
              <LoadingSpinner />
            ) : isError ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  padding: "60px 0",
                  color: "#a2a0a0",
                  fontSize: 14,
                }}
              >
                <span>데이터를 불러오지 못했습니다.</span>
                <button
                  onClick={() => refetch()}
                  style={{
                    padding: "8px 20px",
                    background: "#0056ee",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  다시 시도
                </button>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#edf1f4" }}>
                    <th style={{ ...thStyle, width: 114 }}>
                      {t("payments_col_request_date")}
                    </th>
                    <th style={{ ...thStyle, width: 152 }}>
                      {t("payments_col_company")}
                    </th>
                    <th
                      style={{ ...thStyle, width: 123, whiteSpace: "pre-line" }}
                    >
                      {t("payments_col_amount")}
                    </th>
                    <th style={thStyle}>{t("payments_col_status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          padding: "60px 0",
                          textAlign: "center",
                          color: "#a2a0a0",
                          fontSize: 14,
                        }}
                      >
                        {t("payments_empty")}
                      </td>
                    </tr>
                  ) : (
                    items.map((item, index) => (
                      <PaymentRow
                        key={item._id}
                        item={item}
                        isSelected={selectedId === item._id}
                        onClick={() =>
                          setSelectedId(
                            item._id === selectedId ? null : item._id,
                          )
                        }
                        index={index}
                      />
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                padding: 16,
              }}
            >
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                style={paginationBtnStyle(page === 1)}
              >
                {"<"}
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={paginationBtnStyle(false, p === page)}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                style={paginationBtnStyle(page === totalPages)}
              >
                {">"}
              </button>
            </div>
          )}
        </div>

        <div
          style={{
            width: 519,
            minWidth: 519,
            padding: "20px 8px 40px 24px",
            overflowY: "auto",
          }}
        >
          <AnimatePresence mode="wait">
            {selectedId ? (
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.3, ease: ROW_EASE }}
              >
                <PaymentDetail paymentId={selectedId} />
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "#a2a0a0",
                  fontSize: 14,
                }}
              >
                목록에서 결제 건을 선택하세요.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function paginationBtnStyle(disabled, isActive = false) {
  return {
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #e8ecf0",
    borderRadius: 6,
    background: isActive ? "#0056ee" : "#fff",
    color: isActive ? "#fff" : disabled ? "#c0c0c0" : "#080616",
    fontSize: 13,
    cursor: disabled ? "default" : "pointer",
    fontWeight: isActive ? 600 : 400,
  };
}
