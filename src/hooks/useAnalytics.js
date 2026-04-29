import { useQuery } from "@tanstack/react-query";
import {
  analyticsDashboard,
  analyticsTopIndustries,
  analyticsRecentTransactions,
} from "../apis/analytics";

export function useAnalyticsDashboard() {
  return useQuery({
    queryKey: ["analytics", "dashboard"],
    queryFn: analyticsDashboard,
  });
}

export function useTopIndustries() {
  return useQuery({
    queryKey: ["analytics", "industries"],
    queryFn: analyticsTopIndustries,
  });
}

export function useRecentTransactions() {
  return useQuery({
    queryKey: ["analytics", "transactions"],
    queryFn: analyticsRecentTransactions,
  });
}
