import { useAuthStore } from "@/stores/authStore";
import LoadingSpinner from "@/components/LoadingSpinner.jsx";
import {
  useEscrowPayment,
  useApproveEscrowPayment,
  useApproveEscrowEvent,
  usePayEscrow,
} from "@/hooks/payments/useEscrowPayments";
import { useMyProfile } from "@/hooks/myBusiness/useMyProfile";

function EscrowStatusBadge({ status }) {
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
      {isDone ? "Done" : "In Progress"}
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
}) {
  const { mutate: approveEvent, isPending: isPendingApprove } =
    useApproveEscrowEvent(paymentId);
  const { mutate: payEscrow, isPending: isPendingPay } =
    usePayEscrow(paymentId);
  const isPending = isPendingApprove || isPendingPay;

  const isPendingEscrow = escrowStatus === "PENDING_ESCROW";
  const bothDone = approval.buyerApproved && approval.sellerApproved;
  const locked = !prevDone && index > 0;

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
            label="Buyer Confirmed"
            myApproved={approval.buyerApproved}
            bothDone={bothDone}
            disabled={!isBuyer || locked || isPending || isPendingAny}
            onClick={() =>
              isPendingEscrow
                ? payEscrow()
                : approveEvent({ escrowId, type: approval.eventType })
            }
          />
          <ConfirmButton
            label="Seller Confirmed"
            myApproved={approval.sellerApproved}
            bothDone={bothDone}
            disabled={isBuyer || locked || isPending || isPendingAny}
            onClick={() => approveEvent({ escrowId, type: approval.eventType })}
          />
        </div>
        {bothDone && (
          <span style={{ fontSize: 9, color: "#a2a0a0", whiteSpace: "nowrap" }}>
            {doneDate ? `${doneDate} Done` : "Done"}
          </span>
        )}
      </div>
    </div>
  );
}

function EscrowItem({ escrow, index, isBuyer, paymentId }) {
  const { mutate: _approveEvent, isPending: isPendingAny } =
    useApproveEscrowEvent(paymentId);

  const approvals = escrow.approvals ?? [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 17 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#080616" }}>
          Escrow Info {index + 1}
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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function PaymentDetail({ paymentId }) {
  const { companyId } = useAuthStore();
  const { data, isLoading, isError, refetch } = useEscrowPayment(paymentId);
  const { mutate: approvePayment, isPending: isApproving } =
    useApproveEscrowPayment(paymentId);

  const { data: myProfile } = useMyProfile();

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
    );
  }

  if (!data) return null;

  const isBuyer = data.buyerId === companyId;

  const counterpartyName = isBuyer
    ? (data.seller?.name ?? data.sellerCompanyName ?? "-")
    : (data.buyer?.name ?? data.buyerCompanyName ?? "-");

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

  const myWalletAddress = myProfile?.wallet?.address ?? null;
  const buyerWalletAddress = isBuyer
    ? myWalletAddress
    : (data.buyerWalletAddress ?? data.buyer?.wallet?.address ?? null);
  const sellerWalletAddress = isBuyer
    ? (data.sellerWalletAddress ?? data.seller?.wallet?.address ?? null)
    : myWalletAddress;

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
            Transaction Details
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 10, color: "#a2a0a0" }}>
              {counterpartyName}
            </span>
            <span style={{ fontSize: 10, color: "#a2a0a0" }}>
              Request Date {requestDate}
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
            Total Amount
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
              Buyer XRP Wallet Address
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
              Seller XRP Wallet Address
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
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 40,
          paddingBottom: showApprovalButtons ? 24 : 0,
        }}
      >
        {sortedEscrows.map((escrow, i) => (
          <EscrowItem
            key={escrow._id}
            escrow={escrow}
            index={i}
            isBuyer={isBuyer}
            paymentId={paymentId}
          />
        ))}
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
            Reject
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
            Accept
          </button>
        </div>
      )}
    </div>
  );
}
