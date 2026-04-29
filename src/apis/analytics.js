import { http } from "./client";

export const analyticsDashboard = () => http("/analytics/dashboard");

export const analyticsTopIndustries = () => http("/analytics/industries/top");

export const analyticsRecentTransactions = () =>
  http("/analytics/transactions/recent");
