import { http } from "./client";

export const createPayment = (payload, idempotencyKey) =>
  http("/payments", {
    method: "POST",
    headers: { "Idempotency-Key": idempotencyKey },
    body: payload,
  });

export const getPayment = (id) => http(`/payments/${id}`);

export const refreshPayment = (id) =>
  http(`/payments/${id}/refresh`, { method: "POST" });

export const listPayments = (params = {}) => {
  const q = new URLSearchParams(params);
  return http(`/payments?${q.toString()}`);
};

export const getPaymentSummary = () => http("/payments/summary");

export const getRecentPayments = () => http("/payments/recent");
