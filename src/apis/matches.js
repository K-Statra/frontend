import { http } from "./client";

export const getMatches = (buyerId, limit = 10) =>
  http(`/matches?buyerId=${buyerId}&limit=${limit}`);

export const submitMatchFeedback = (companyId, payload) =>
  http(`/matches/${companyId}/feedback`, { method: "POST", body: payload });
