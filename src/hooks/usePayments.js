import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPayment,
  getPayment,
  getPaymentSummary,
  getRecentPayments,
  refreshPayment,
} from "../apis/payments";

export function usePaymentSummary() {
  return useQuery({
    queryKey: ["payments", "summary"],
    queryFn: getPaymentSummary,
  });
}

export function useRecentPayments() {
  return useQuery({
    queryKey: ["payments", "recent"],
    queryFn: getRecentPayments,
  });
}

export function usePayment(id, options = {}) {
  return useQuery({
    queryKey: ["payment", id],
    queryFn: () => getPayment(id),
    enabled: !!id,
    ...options,
  });
}

export function useRefreshPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => refreshPayment(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["payment", id], data);
    },
  });
}

export function useCreatePayment() {
  return useMutation({
    mutationFn: ({ payload, idemKey }) => createPayment(payload, idemKey),
  });
}
