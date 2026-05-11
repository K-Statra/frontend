import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { escrowPaymentsApi } from "@/apis";

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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["escrow-payment", paymentId],
      });
      queryClient.invalidateQueries({ queryKey: ["escrow-payments"] });
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
  });
}
