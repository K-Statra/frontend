import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "@/apis";

export function useAnalyticsDashboard() {
  return useQuery({
    queryKey: ["analytics", "dashboard"],
    queryFn: () => analyticsApi.dashboard(),
  });
}

export function useTopIndustries() {
  return useQuery({
    queryKey: ["analytics", "industries"],
    queryFn: () => analyticsApi.topIndustries(),
  });
}

export function useRecentTransactions() {
  return useQuery({
    queryKey: ["analytics", "transactions"],
    queryFn: () => analyticsApi.recentTransactions(),
  });
}
