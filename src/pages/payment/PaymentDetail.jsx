import { useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useAuthStore } from "@/stores/authStore";
import LoadingSpinner from "@/components/LoadingSpinner.jsx";
import EscrowPaymentModal from "@/components/payment/EscrowPaymentModal";
import {
  useEscrowPayment,
  useApproveEscrowPayment,
  useApproveEscrowEvent,
  usePayEscrow,
} from "@/hooks/payments/useEscrowPayments";
import { useMyProfile } from "@/hooks/myBusiness/useMyProfile";

const PAID_STATUSES = ["PROCESSING", "ACTIVE", "COMPLETED"];
const PRE_ESCROWED_ITEM_STATUSES = ["PENDING_ESCROW", "SUBMITTING"];

function EscrowStatusBadge({ status }) {
  const { t } = useI18n();
  const isDone = status === "RELEASED";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 6px",
        borderRadius: 9999,
        fontSize: 10,
        background: isDone ? "#fef9c3" : "#fde6ed",
        color: isDone ? "#b9a41d" : "#e8014a",
        whiteSpace: "nowrap",
      }}
    >
      {isDone ? t("payments_detail_done") : t("payments_status_in_progress")}
    </span>
  );
}

function ConfirmButton({ label, myApproved, bothDone, disabled, onClick }) {
  let bg, color;
  if (bothDone) {
    bg = "#0056ee";
    color = "#fafafa";
  } else if (myApproved) {
    bg = "#bed4fa";
    color = "#0056ee";
  } else {
    bg = "#dadada";
    color = "#fafafa";
  }

  const clickable = !disabled && !myApproved && !bothDone;

  return (
    <button
      onClick={clickable ? onClick : undefined}
      style={{
        width: 94,
        padding: "8px 12px",
        borderRadius: 8,
        border: "none",
        background: bg,
        color,
        fontSize: 10,
        fontWeight: 500,
        cursor: clickable ? "pointer" : "default",
        opacity: disabled ? 0.4 : 1,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

function EventRow({
  approval,
  index,
  isBuyer,
  paymentId,
  escrowId,
  prevDone,
  isPendingAny,
  escrowStatus,
  escrowLocked,
}) {
  const { t } = useI18n();
  const { mutate: approveEvent, isPending: isPendingApprove } =
    useApproveEscrowEvent(paymentId);

  const notYetEscrowed = PRE_ESCROWED_ITEM_STATUSES.includes(escrowStatus);
  const bothDone = approval.buyerApproved && approval.sellerApproved;
  const locked = escrowLocked || (!prevDone && index > 0) || notYetEscrowed;

  const doneDate =
    bothDone && (approval.completedAt ?? approval.updatedAt ?? approval.doneAt)
      ? new Date(approval.completedAt ?? approval.updatedAt ?? approval.doneAt)
          .toISOString()
          .slice(0, 10)
      : null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
      <span
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: "#080616",
          minWidth: 50,
        }}
      >
        {approval.eventType}
      </span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: locked ? 0.35 : 1,
        }}
      >
        <div style={{ display: "flex", gap: 24 }}>
          <ConfirmButton
            label={t("payments_confirm_buyer")}
            myApproved={approval.buyerApproved}
            bothDone={bothDone}
            disabled={!isBuyer || locked || isPendingApprove || isPendingAny}
            onClick={() => approveEvent({ escrowId, type: approval.eventType })}
          />
          <ConfirmButton
            label={t("payments_confirm_seller")}
            myApproved={approval.sellerApproved}
            bothDone={bothDone}
            disabled={isBuyer || locked || isPendingApprove || isPendingAny}
            onClick={() => approveEvent({ escrowId, type: approval.eventType })}
          />
        </div>
        {bothDone && (
          <span style={{ fontSize: 9, color: "#a2a0a0", whiteSpace: "nowrap" }}>
            {doneDate
              ? `${doneDate} ${t("payments_detail_done")}`
              : t("payments_detail_done")}
          </span>
        )}
      </div>
    </div>
  );
}

function EscrowItem({ escrow, index, isBuyer, paymentId, prevEscrowsDone }) {
  const { t } = useI18n();
  const { mutate: _approveEvent, isPending: isPendingAny } =
    useApproveEscrowEvent(paymentId);

  const approvals = escrow.approvals ?? [];
  const escrowLocked = !prevEscrowsDone;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 17 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#080616" }}>
          {t("payment_escrow_info_label")} {index + 1}
        </span>
        <EscrowStatusBadge status={escrow.status} />
      </div>

      <div
        style={{
          border: "0.5px solid #a2a0a0",
          borderRadius: 12,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f6f6f6",
            padding: 12,
            borderBottom: "0.5px dashed #a2a0a0",
            borderRadius: "12px 12px 0 0",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 500, color: "#080616" }}>
            {escrow.label}
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#0056ee" }}>
            {escrow.amountXrp != null ? escrow.amountXrp.toLocaleString() : "0"}{" "}
            XRP
          </span>
        </div>

        <div
          style={{
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            borderRadius: "0 0 12px 12px",
          }}
        >
          {approvals.map((approval, i) => {
            const prevDone =
              i === 0 ||
              (approvals[i - 1].buyerApproved &&
                approvals[i - 1].sellerApproved);
            return (
              <EventRow
                key={approval.eventType}
                approval={approval}
                index={i}
                isBuyer={isBuyer}
                paymentId={paymentId}
                escrowId={escrow._id}
                prevDone={prevDone}
                isPendingAny={isPendingAny}
                escrowStatus={escrow.status}
                escrowLocked={escrowLocked}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function PaymentDetail({ paymentId }) {
  const { t } = useI18n();
  const { role } = useAuthStore();
  const { data, isLoading, isError, refetch } = useEscrowPayment(paymentId);
  const { mutate: approvePayment, isPending: isApproving } =
    useApproveEscrowPayment(paymentId);
  const { mutate: payEscrow, isPending: isPayPending } =
    usePayEscrow(paymentId);

  const { data: myProfile } = useMyProfile();
  const [payModalOpen, setPayModalOpen] = useState(false);

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
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
        <span>{t("payments_detail_load_error")}</span>
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
          {t("payments_detail_retry")}
        </button>
      </div>
    );
  }

  if (!data) return null;

  const isBuyer = role === "buyer";

  const counterpartyName = data.partnerName ?? "-";

  const requestDate = data.createdAt
    ? new Date(data.createdAt)
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\. /g, " / ")
        .replace(/\.$/, "")
    : "-";

  const totalAmount =
    data.totalAmountXrp != null
      ? `${data.totalAmountXrp.toLocaleString()} ${data.currency ?? "XRP"}`
      : "-";

  const myApprovedAtPaymentLevel = isBuyer
    ? data.buyerApproved
    : data.sellerApproved;
  const showApprovalButtons = !myApprovedAtPaymentLevel;
  const sortedEscrows = [...(data.escrows ?? [])].sort(
    (a, b) => a.order - b.order,
  );

  const myWalletAddress =
    data.myWalletAddress ?? myProfile?.wallet?.address ?? null;
  const partnerWalletAddress = data.partnerWalletAddress ?? null;
  const buyerWalletAddress = isBuyer ? myWalletAddress : partnerWalletAddress;
  const sellerWalletAddress = isBuyer ? partnerWalletAddress : myWalletAddress;

  const isPaid = PAID_STATUSES.includes(data.status);
  const canInitiatePayment = isBuyer && data.status === "APPROVED";
  const showPayButton = isBuyer && (canInitiatePayment || isPaid);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", width: 428, gap: 0 }}
    >
      <div
        style={{
          borderBottom: "1px dashed #a2a0a0",
          paddingBottom: 20,
          marginBottom: 20,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080616" }}>
            {t("payments_detail_title")}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 10, color: "#a2a0a0" }}>
              {counterpartyName}
            </span>
            <span style={{ fontSize: 10, color: "#a2a0a0" }}>
              {t("payments_detail_request_date")} {requestDate}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 500, color: "#a2a0a0" }}>
            {t("payments_detail_total_amount")}
          </span>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#0056ee" }}>
            {totalAmount}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "#a2a0a0",
                whiteSpace: "nowrap",
              }}
            >
              {t("payments_detail_buyer_wallet")}
            </span>
            <div
              style={{
                flex: 1,
                background: "#fafafa",
                border: "1px solid #dadada",
                borderRadius: 8,
                padding: "8px 12px",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: "#080616",
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {buyerWalletAddress ?? "-"}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "#a2a0a0",
                whiteSpace: "nowrap",
              }}
            >
              {t("payments_detail_seller_wallet")}
            </span>
            <div
              style={{
                flex: 1,
                background: "#fafafa",
                border: "1px solid #dadada",
                borderRadius: 8,
                padding: "8px 12px",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: "#080616",
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {sellerWalletAddress ?? "-"}
              </span>
            </div>
          </div>
        </div>

        {showPayButton && (
          <button
            onClick={
              canInitiatePayment ? () => setPayModalOpen(true) : undefined
            }
            disabled={!canInitiatePayment || isPayPending}
            style={{
              width: "100%",
              height: 46,
              borderRadius: 8,
              border: "none",
              background: canInitiatePayment ? "#0056ee" : "#dadada",
              color: "#fafafa",
              fontSize: 16,
              fontWeight: 500,
              lineHeight: "22px",
              cursor:
                canInitiatePayment && !isPayPending ? "pointer" : "default",
            }}
          >
            {isPaid
              ? t("payments_detail_escrow_payment_completed")
              : t("payments_detail_escrow_payment")}
          </button>
        )}
      </div>

      <EscrowPaymentModal
        open={payModalOpen}
        isPending={isPayPending}
        onClose={() => setPayModalOpen(false)}
        onConfirm={() =>
          payEscrow(undefined, {
            onSuccess: () => setPayModalOpen(false),
          })
        }
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 40,
          paddingBottom: showApprovalButtons ? 24 : 0,
        }}
      >
        {sortedEscrows.map((escrow, i) => {
          const prevEscrowsDone =
            i === 0 ||
            sortedEscrows.slice(0, i).every((e) => e.status === "RELEASED");
          return (
            <EscrowItem
              key={escrow._id}
              escrow={escrow}
              index={i}
              isBuyer={isBuyer}
              paymentId={paymentId}
              prevEscrowsDone={prevEscrowsDone}
            />
          );
        })}
      </div>

      {showApprovalButtons && (
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => approvePayment("REJECT")}
            disabled={isApproving}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              border: "none",
              background: "#080616",
              color: "#fafafa",
              fontSize: 16,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {t("payments_action_reject")}
          </button>
          <button
            onClick={() => approvePayment("ACCEPT")}
            disabled={isApproving}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              border: "none",
              background: "#0056ee",
              color: "#fafafa",
              fontSize: 16,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {t("payments_action_accept")}
          </button>
        </div>
      )}
    </div>
  );
}
