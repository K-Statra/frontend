import { useMemo } from "react";
import Button from "@/components/Button.jsx";
import { useI18n } from "@/lib/i18n/I18nProvider.jsx";
import { track } from "@/lib/analytics.js";
import { useAnalyticsDashboard } from "@/hooks/useAnalytics";
import { usePaymentSummary, useRecentPayments } from "@/hooks/usePayments";

const paymentStatSeed = [
  {
    id: "total",
    labelKey: "payments_total",
    value: 45,
    change: "+12% last month",
    icon: "🧾",
  },
  {
    id: "contracts",
    labelKey: "payments_active_contracts",
    value: 12,
    change: "+3 new this week",
    icon: "📄",
  },
  {
    id: "pending",
    labelKey: "payments_pending",
    value: 8,
    change: "2 due this week",
    icon: "⏳",
  },
  {
    id: "completed",
    labelKey: "payments_completed",
    value: 37,
    change: "$2.4M total value",
    icon: "✅",
  },
];

const transactionStatSeed = [
  {
    id: "totalSent",
    labelKey: "payments_total_sent",
    value: "$50,000.00",
    change: "85,420.30 XRP",
    tone: "warning",
  },
  {
    id: "totalReceived",
    labelKey: "payments_total_received",
    value: "$120,000.00",
    change: "205,200.70 XRP",
    tone: "success",
  },
  {
    id: "pendingTransactions",
    labelKey: "payments_pending_tx",
    value: "1",
    change: "Awaiting confirmation",
    tone: "warning",
  },
  {
    id: "completedTransactions",
    labelKey: "payments_completed_tx",
    value: "2",
    change: "Successful transactions",
    tone: "success",
  },
];

const transactionsSeed = [
  {
    id: 1,
    company: "BeautyTech Korea",
    description: "K-Beauty product order - Premium skincare line",
    date: "Jan 15, 2024, 07:30 PM",
    amount: "-$50,000.00",
    xrpl: "85,420.30 XRP",
    status: "completed",
  },
  {
    id: 2,
    company: "RoboTech Solutions",
    description: "Industrial automation system sale",
    date: "Jan 15, 2024, 12:45 AM",
    amount: "+$120,000.00",
    xrpl: "205,200.70 XRP",
    status: "completed",
  },
];

export default function PaymentsPage() {
  const { t } = useI18n();

  const { data: dashboardData } = useAnalyticsDashboard();
  const { data: summaryData } = usePaymentSummary();
  const { data: recentPaymentsData } = useRecentPayments();

  const paymentStats = useMemo(() => {
    if (!dashboardData) return paymentStatSeed;
    return paymentStatSeed.map((card) => {
      if (card.id === "total" && dashboardData.totalPartners !== undefined)
        return { ...card, value: dashboardData.totalPartners };
      if (card.id === "pending" && dashboardData.pendingPayments !== undefined)
        return { ...card, value: dashboardData.pendingPayments };
      if (card.id === "completed" && dashboardData.completedDeals !== undefined)
        return { ...card, value: dashboardData.completedDeals };
      return card;
    });
  }, [dashboardData]);

  const transactionStats = useMemo(() => {
    if (!summaryData) return transactionStatSeed;
    return transactionStatSeed.map((card) => {
      if (card.id === "totalSent" && summaryData.totalAmount !== undefined)
        return {
          ...card,
          value: `$${Number(summaryData.totalAmount).toLocaleString()}`,
        };
      if (
        card.id === "pendingTransactions" &&
        summaryData.pending !== undefined
      )
        return { ...card, value: String(summaryData.pending) };
      if (card.id === "completedTransactions" && summaryData.paid !== undefined)
        return { ...card, value: String(summaryData.paid) };
      return card;
    });
  }, [summaryData]);

  const transactions = useMemo(() => {
    if (!Array.isArray(recentPaymentsData)) return transactionsSeed;
    return recentPaymentsData.map((item) => ({
      id: item._id,
      company: item.companyId?.name || "Unknown",
      description: item.memo || "",
      date: item.createdAt ? new Date(item.createdAt).toLocaleString() : "",
      amount: `${item.amount >= 0 ? "+" : "-"}$${Math.abs(item.amount || 0).toLocaleString()}`,
      xrpl: `${(item.amount || 0).toLocaleString()} ${item.currency || ""}`,
      status: item.status?.toLowerCase() || "pending",
    }));
  }, [recentPaymentsData]);

  return (
    <div className="payments container">
      <div className="dashboard-header row space">
        <div>
          <h1>{t("payments_title_heading")}</h1>
          <p className="muted">{t("payments_subheading")}</p>
        </div>
        <Button
          onClick={() => {
            track("payments_new_contract_click");
          }}
        >
          {t("payments_new_contract")}
        </Button>
      </div>

      <section className="stat-grid">
        {paymentStats.map((card) => (
          <article key={card.id} className="stat-card">
            <div className="stat-icon" aria-hidden="true">
              {card.icon}
            </div>
            <div className="stat-content">
              <p className="muted small">{t(card.labelKey)}</p>
              <strong>{card.value}</strong>
              <span className="muted tiny">{card.change}</span>
            </div>
          </article>
        ))}
      </section>

      <div className="tab-row">
        <button
          className="chip-btn active"
          type="button"
          onClick={() => track("payments_tab_select", { tab: "payments" })}
        >
          {t("payments_tab_payments")}
        </button>
        <button
          className="chip-btn"
          type="button"
          onClick={() => track("payments_tab_select", { tab: "contracts" })}
        >
          {t("payments_tab_contracts")}
        </button>
        <button
          className="chip-btn"
          type="button"
          onClick={() => track("payments_tab_select", { tab: "activity" })}
        >
          {t("payments_tab_activity")}
        </button>
      </div>

      <section className="payments-section row space">
        <div>
          <h2>{t("payments_transactions_title")}</h2>
          <p className="muted small">{t("payments_transactions_subheading")}</p>
        </div>
        <Button
          onClick={() => {
            track("payments_new_payment_click");
          }}
        >
          {t("payments_new_payment")}
        </Button>
      </section>

      <div className="tab-row small">
        <button
          className="chip-btn active"
          type="button"
          onClick={() => track("transactions_tab_select", { tab: "overview" })}
        >
          {t("payments_tab_overview")}
        </button>
        <button
          className="chip-btn"
          type="button"
          onClick={() => track("transactions_tab_select", { tab: "history" })}
        >
          {t("payments_tab_history")}
        </button>
        <button
          className="chip-btn"
          type="button"
          onClick={() => track("transactions_tab_select", { tab: "analytics" })}
        >
          {t("payments_tab_analytics")}
        </button>
      </div>

      <section className="stat-grid">
        {transactionStats.map((card) => (
          <article key={card.id} className={`stat-card ${card.tone}`}>
            <div className="stat-content">
              <p className="muted small">{t(card.labelKey)}</p>
              <strong>{card.value}</strong>
              <span className="muted tiny">{card.change}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="panel">
        <h3>{t("payments_recent_transactions")}</h3>
        <ul className="activity-list">
          {transactions.map((tx) => (
            <li key={tx.id} className={`activity transaction ${tx.status}`}>
              <div>
                <strong>{tx.company}</strong>
                <div className="muted tiny">{tx.description}</div>
                <div className="muted tiny">{tx.date}</div>
              </div>
              <div className="transaction-amount">
                <strong>{tx.amount}</strong>
                <span className="muted tiny">{tx.xrpl}</span>
                <span className={`status-pill ${tx.status}`}>{tx.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
