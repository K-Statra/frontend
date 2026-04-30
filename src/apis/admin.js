import { http, BASE_URL } from "./client";

export const adminListPayments = ({ token, ...params }) => {
  const q = new URLSearchParams({ limit: "20", ...params });
  return http(`/admin/payments?${q.toString()}`, {
    headers: { "X-Admin-Token": token },
  });
};

export const adminGetPaymentStats = ({
  token,
  from,
  to,
  buyerId,
  companyId,
}) => {
  const q = new URLSearchParams({});
  if (from) q.set("from", from);
  if (to) q.set("to", to);
  if (buyerId) q.set("buyerId", buyerId);
  if (companyId) q.set("companyId", companyId);
  const qs = q.toString();
  return http(`/admin/payments/stats${qs ? `?${qs}` : ""}`, {
    headers: { "X-Admin-Token": token },
  });
};

export const adminGetStats = ({ token }) =>
  http("/admin/stats", { headers: { "X-Admin-Token": token } });

export const adminListMatches = ({ token, ...params }) => {
  const q = new URLSearchParams({ limit: "20", ...params });
  return http(`/admin/matches?${q.toString()}`, {
    headers: { "X-Admin-Token": token },
  });
};

export const adminExportPayments = async ({ token, ...params }) => {
  const q = new URLSearchParams({ ...params });
  const res = await fetch(`${BASE_URL}/admin/payments/export?${q.toString()}`, {
    headers: { "X-Admin-Token": token },
  });
  if (!res.ok) throw new Error("Export failed");
  return res.blob();
};
