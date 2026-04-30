import { http } from "../http";

export const analyticsApi = {
  dashboard: () => http.get("/analytics/dashboard"),
  topIndustries: () => http.get("/analytics/industries/top"),
  recentTransactions: () => http.get("/analytics/transactions/recent"),
};
