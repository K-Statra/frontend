import { http } from "@/apis/http";

interface AdminParams {
  token: string;
  [key: string]: unknown;
}

export const adminApi = {
  listPayments: ({ token, ...params }: AdminParams) =>
    http.get("/admin/payments", {
      params: { limit: 20, ...params },
      headers: { "X-Admin-Token": token },
    }),

  getPaymentStats: ({
    token,
    from,
    to,
    buyerId,
    companyId,
  }: {
    token: string;
    from?: string;
    to?: string;
    buyerId?: string;
    companyId?: string;
  }) =>
    http.get("/admin/payments/stats", {
      params: { from, to, buyerId, companyId },
      headers: { "X-Admin-Token": token },
    }),

  getStats: ({ token }: { token: string }) =>
    http.get("/admin/stats", { headers: { "X-Admin-Token": token } }),

  listMatches: ({ token, ...params }: AdminParams) =>
    http.get("/admin/matches", {
      params: { limit: 20, ...params },
      headers: { "X-Admin-Token": token },
    }),

  exportPayments: async ({ token, ...params }: AdminParams) =>
    http.get("/admin/payments/export", {
      params,
      headers: { "X-Admin-Token": token },
      responseType: "blob",
    }),
};
