import { http } from "@/apis/http";

export const analyticsApi = {
  dashboard: () => http.get("/analytics/dashboard"),
  topIndustries: () => http.get("/analytics/industries/top"),
  recentTransactions: () => http.get("/analytics/transactions/recent"),
};
