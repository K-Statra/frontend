import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { escrowPaymentsApi } from "@/apis";

function extractErrorMessage(error, fallback) {
  const msg = error?.response?.data?.message?.message;
  let text;
  if (Array.isArray(msg)) text = msg.join(", ");
  else if (typeof msg === "string") text = msg;
  else return fallback;

  if (text.startsWith("Insufficient XRP balance")) {
    return "잔액이 부족합니다.";
  }
  return text;
}

export function useEscrowPaymentList(group, page = 1, limit = 10) {
  return useQuery({
    queryKey: ["escrow-payments", group, page, limit],
    queryFn: () => escrowPaymentsApi.getList({ group, page, limit }),
  });
}

export function useEscrowPayment(id) {
  return useQuery({
    queryKey: ["escrow-payment", id],
    queryFn: () => escrowPaymentsApi.getById(id),
    enabled: !!id,
  });
}

export function useApproveEscrowPayment(paymentId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (action) => escrowPaymentsApi.approve(paymentId, action),
    onSuccess: (_, action) => {
      queryClient.invalidateQueries({
        queryKey: ["escrow-payment", paymentId],
      });
      queryClient.invalidateQueries({ queryKey: ["escrow-payments"] });
      toast.success(
        action === "REJECT"
          ? "결제 요청을 거절했습니다."
          : "결제 요청을 수락했습니다.",
      );
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "결제 승인에 실패했습니다."));
    },
  });
}

export function useApproveEscrowEvent(paymentId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ escrowId, type }) =>
      escrowPaymentsApi.approveEvent(paymentId, escrowId, type),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["escrow-payment", paymentId],
      });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "이벤트 승인에 실패했습니다."));
    },
  });
}

export function usePayEscrow(paymentId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => escrowPaymentsApi.pay(paymentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["escrow-payment", paymentId],
      });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "결제 개시에 실패했습니다."));
    },
  });
}
