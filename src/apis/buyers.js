import { http } from "./client";

export const listBuyers = (params = {}) => {
  const q = new URLSearchParams({ limit: "50", ...params });
  return http(`/buyers?${q.toString()}`);
};

export const createBuyer = (data) =>
  http("/buyers", { method: "POST", body: data });
