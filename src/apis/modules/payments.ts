import { http } from "@/apis/http";
import { ENDPOINTS } from "@/apis/endpoints";

export interface CreatePaymentDto {
  amount: number;
  currency?: "XRP" | "USD" | "KRW";
  buyerId: string;
  companyId: string;
  memo?: string;
}

export const paymentsApi = {
  create: (data: CreatePaymentDto, idempotencyKey: string) => {
    if (!idempotencyKey?.trim()) throw new Error("Idempotency-Key is required");
    return http.post(ENDPOINTS.payments.root, data, {
      headers: { "Idempotency-Key": idempotencyKey },
    });
  },

  getById: (id: string) =>
    http.get(ENDPOINTS.payments.byId(id)),

  refresh: (id: string) =>
    http.post(ENDPOINTS.payments.refresh(id)),

  getSummary: () =>
    http.get(ENDPOINTS.payments.summary),

  getRecent: () =>
    http.get(ENDPOINTS.payments.recent),
};
