import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { newIdemKey } from "@/apis";
import Modal from "@/components/Modal";
import { buildGuideFromInvoice } from "@/lib/guide";
import { useCountdown } from "@/hooks/useCountdown";
import IssuedCurrencyGuide from "@/components/IssuedCurrencyGuide";
import { useI18n } from "@/lib/i18n/I18nProvider";
import {
  usePayment,
  useRefreshPayment,
  useCreatePayment,
} from "@/hooks/usePayments";

export default function PaymentCheckout2() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useI18n();
  const [msg, setMsg] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editAmount, setEditAmount] = useState("");
  const [editCurrency, setEditCurrency] = useState("");

  const pollMs = Math.max(
    1000,
    Number(import.meta?.env?.VITE_PAYMENT_POLL_MS || 3000),
  );
  const configuredRedirect =
    import.meta?.env?.VITE_PAYMENT_EXPIRED_REDIRECT || "";
  const qrBase =
    import.meta?.env?.VITE_QR_IMG_BASE ||
    "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=";

  const { data, isLoading: loading } = usePayment(id, {
    refetchInterval: (query) =>
      query.state.data?.status === "PENDING" ? pollMs : false,
  });

  const left = useCountdown(data?.invoice?.expiresAt);
  const deeplink = data?.invoice?.deeplink || "";

  const guide = data?.invoice
    ? buildGuideFromInvoice(data.invoice, navigator.language)
    : null;

  const qrUrl = useMemo(
    () =>
      deeplink && qrBase !== "none"
        ? `${qrBase}${encodeURIComponent(deeplink)}`
        : "",
    [deeplink, qrBase],
  );

  const currencies = useMemo(() => {
    const raw = import.meta?.env?.VITE_PAYMENT_CURRENCIES || "XRP,USD,KRW";
    return String(raw)
      .split(",")
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean);
  }, []);

  const currencyOptions = useMemo(
    () =>
      currencies.map((c) => ({
        code: c,
        label: (t && t(`currency_name_${c}`)) || c,
        desc: (t && t(`currency_desc_${c}`)) || "",
      })),
    [currencies, t],
  );

  const { mutateAsync: doRefresh, isPending: refreshing } = useRefreshPayment();
  const { mutateAsync: doCreate, isPending: creating } = useCreatePayment();

  useEffect(() => {
    if (left != null && left <= 0) {
      setMsg(t("expired"));
      const fallback = `/payments/${id}`;
      const target = (configuredRedirect || "").replace(":id", id) || fallback;
      const timer = setTimeout(() => navigate(target), 1500);
      return () => clearTimeout(timer);
    }
  }, [left, t, id, configuredRedirect, navigate]);

  async function recreatePayment() {
    if (!data) return false;
    setMsg("");
    try {
      const amt = Number(editAmount || data.amount);
      if (!Number.isFinite(amt) || amt <= 0)
        throw new Error(t("invalid_amount"));
      const curr = String(editCurrency || data.currency || "XRP").toUpperCase();
      const payload = {
        amount: amt,
        currency: curr,
        buyerId: data.buyerId,
        companyId: data.companyId,
        memo: data.memo,
      };
      const res = await doCreate({ payload, idemKey: newIdemKey() });
      const newId = res?._id;
      if (newId)
        navigate(`/payments/checkout/${newId}`, { state: { prevId: id } });
      return true;
    } catch (e) {
      setMsg(`${t("refresh_failed")}: ${e?.message || ""}`.trim());
      return false;
    }
  }

  function openConfirm() {
    if (data) {
      setEditAmount(String(data.amount ?? ""));
      setEditCurrency(String(data.currency || "XRP"));
    }
    setConfirmOpen(true);
  }
  function closeConfirm() {
    setConfirmOpen(false);
  }

  async function manualRefresh() {
    if (!id) return;
    setMsg("");
    try {
      await doRefresh(id);
    } catch (e) {
      setMsg(`${t("refresh_failed")}: ${e?.message || ""}`.trim());
    }
  }

  async function copyDeeplink() {
    try {
      if (!deeplink) return;
      await navigator.clipboard.writeText(deeplink);
      setMsg(t("copied"));
      setTimeout(() => setMsg(""), 1500);
    } catch (_) {
      setMsg(t("copy_failed"));
    }
  }

  return (
    <div>
      <h2>{t("payment_checkout_title")}</h2>
      {loading && <div>{t("loading")}</div>}
      {msg && (
        <div className="info" role="status" aria-live="polite">
          {msg}
        </div>
      )}
      {data && data.invoice && (
        <div className="card">
          <div>
            {t("state")}: <strong>{data.status}</strong>
          </div>
          <div>
            {t("deeplink_label")}:{" "}
            {deeplink ? (
              <a href={deeplink}>{deeplink}</a>
            ) : (
              <span className="muted">({t("none")})</span>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button
              onClick={copyDeeplink}
              disabled={!deeplink}
              aria-disabled={!deeplink}
              aria-label={t("copy_link")}
            >
              {t("copy_link")}
            </button>
            <button
              onClick={() => window.open(deeplink, "_blank", "noreferrer")}
              disabled={!deeplink}
              aria-disabled={!deeplink}
              aria-label={t("open_wallet")}
            >
              {t("open_wallet")}
            </button>
            <button
              onClick={manualRefresh}
              disabled={refreshing}
              aria-busy={refreshing}
              aria-label={t("manual_refresh")}
            >
              {refreshing ? t("loading") : t("manual_refresh")}
            </button>
          </div>
          {qrUrl && (
            <div style={{ marginTop: 12 }}>
              <div className="muted" style={{ marginBottom: 4 }}>
                {t("qr_label")}
              </div>
              <img src={qrUrl} alt="QR" width={180} height={180} />
            </div>
          )}
          {data.invoice.expiresAt && (
            <div>
              {t("quote_expiry")}:{" "}
              {new Date(data.invoice.expiresAt).toLocaleString()}{" "}
              {left != null && <span className="muted">({left}s)</span>}
            </div>
          )}
        </div>
      )}

      {guide && (
        <div className="card" style={{ marginTop: 12 }}>
          <strong>{guide.title}</strong>
          <ul>
            {(guide.steps || []).map((s) => (
              <li key={s.key}>{s.default}</li>
            ))}
          </ul>
          {left != null && left <= 0 && (
            <div style={{ marginTop: 8 }}>
              <button onClick={openConfirm} disabled={creating}>
                {t("create_new_payment")}
              </button>
            </div>
          )}
          {location?.state?.prevId && (
            <div style={{ marginTop: 8 }}>
              <a href={`/payments/${location.state.prevId}`}>
                {t("compare_prev_payment")}
              </a>
            </div>
          )}
        </div>
      )}

      <Modal
        open={confirmOpen}
        onClose={closeConfirm}
        title={t("confirm_create_title")}
        footer={
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button onClick={closeConfirm}>{t("cancel")}</button>
            <button
              onClick={async () => {
                const ok = await recreatePayment();
                if (ok) closeConfirm();
              }}
              disabled={creating}
              aria-busy={creating}
              type="button"
            >
              {t("confirm")}
            </button>
          </div>
        }
      >
        <div>
          <p>{t("confirm_create_text")}</p>
          {data && (
            <div>
              <div className="row" style={{ gap: 8, alignItems: "center" }}>
                <label
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <span>{t("amount_label")}</span>
                  <input
                    type="number"
                    min="0"
                    step="0.000001"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    placeholder={t("amount_placeholder")}
                    aria-label={t("amount_label")}
                  />
                </label>
                <select
                  value={editCurrency}
                  onChange={(e) => setEditCurrency(e.target.value)}
                  title={
                    currencyOptions.find((o) => o.code === editCurrency)
                      ?.desc || ""
                  }
                >
                  {currencyOptions.map((opt) => (
                    <option key={opt.code} value={opt.code} title={opt.desc}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              {currencyOptions.find((o) => o.code === editCurrency)?.desc && (
                <div className="muted" style={{ marginTop: 6 }}>
                  {currencyOptions.find((o) => o.code === editCurrency)?.desc}
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>

      {data &&
        !data?.invoice?.deeplink &&
        !data?.invoice?.qr &&
        data?.currency &&
        data.currency !== "XRP" && (
          <IssuedCurrencyGuide currency={data.currency} />
        )}
      <p>
        {t("payment_status_title")}{" "}
        <a href={`/payments/${id}`}>{`/payments/${id}`}</a>
      </p>
    </div>
  );
}
