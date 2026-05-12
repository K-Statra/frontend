import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { paymentsApi } from "@/apis";

export function usePaymentSummary() {
  return useQuery({
    queryKey: ["payments", "summary"],
    queryFn: () => paymentsApi.getSummary(),
  });
}

export function useRecentPayments() {
  return useQuery({
    queryKey: ["payments", "recent"],
    queryFn: () => paymentsApi.getRecent(),
  });
}

export function usePayment(id, options = {}) {
  return useQuery({
    queryKey: ["payment", id],
    queryFn: () => paymentsApi.getById(id),
    enabled: !!id,
    ...options,
  });
}

export function useRefreshPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => paymentsApi.refresh(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["payment", id], data);
    },
  });
}

export function useCreatePayment() {
  return useMutation({
    mutationFn: ({ payload, idemKey }) => {
      if (!idemKey?.trim()) throw new Error("Idempotency-Key is required");
      return paymentsApi.create(payload, idemKey);
    },
  });
}
