import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { newIdemKey } from "../apis/client";
import Modal from "../components/Modal";
import { buildGuideFromInvoice } from "../lib/guide";
import { useCountdown } from "../hooks/useCountdown";
import IssuedCurrencyGuide from "../components/IssuedCurrencyGuide";
import { useI18n } from "../lib/i18n/I18nProvider";
import {
  usePayment,
  useRefreshPayment,
  useCreatePayment,
} from "../hooks/usePayments";

export default function PaymentCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [msg, setMsg] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

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
  }, [left]);

  async function recreatePayment() {
    if (!data) return;
    setMsg("");
    try {
      const payload = {
        amount: data.amount,
        currency: data.currency,
        buyerId: data.buyerId,
        companyId: data.companyId,
        memo: data.memo,
      };
      const res = await doCreate({ payload, idemKey: newIdemKey() });
      const newId = res?.payment?._id || res?._id;
      if (newId) navigate(`/payments/checkout/${newId}`);
    } catch (e) {
      setMsg(`${t("refresh_failed")}: ${e?.message || ""}`.trim());
    }
  }

  function openConfirm() {
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
            <a href={deeplink} target="_blank" rel="noreferrer">
              <button
                disabled={!deeplink}
                aria-disabled={!deeplink}
                aria-label={t("open_wallet")}
              >
                {t("open_wallet")}
              </button>
            </a>
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
                closeConfirm();
                await recreatePayment();
              }}
              aria-busy={creating}
            >
              {t("confirm")}
            </button>
          </div>
        }
      >
        <div>
          <p>{t("confirm_create_text")}</p>
          {data && (
            <ul>
              <li>
                {t("state")}: {data.status}
              </li>
              <li>
                Amount: {data.amount} {data.currency}
              </li>
            </ul>
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
        <a href={`/payments/${id}`}>{t("payment_status_title")}</a>
      </p>
    </div>
  );
}
