import { useParams } from "react-router-dom";
import { usePayment, useRefreshPayment } from "@/hooks/usePayments";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function PaymentStatus() {
  const { id } = useParams();
  const { t } = useI18n();

  const { data, isLoading: loading, error } = usePayment(id);
  const { mutateAsync: refresh } = useRefreshPayment();

  async function handleRefresh() {
    try {
      await refresh(id);
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div>
      <h2>{t("payment_status_title")}</h2>
      {loading && <div>{t("loading")}</div>}
      {error && <div className="error">{error.message}</div>}
      {data && (
        <div className="card">
          <div>ID: {data._id}</div>
          <div>
            {t("state")}: <strong>{data.status}</strong>
          </div>
          {data.quote?.expiresAt && (
            <div>
              {t("quote_expiry")}:{" "}
              {new Date(data.quote.expiresAt).toLocaleString()}
            </div>
          )}
          <button onClick={handleRefresh}>{t("manual_refresh")}</button>
        </div>
      )}
    </div>
  );
}
