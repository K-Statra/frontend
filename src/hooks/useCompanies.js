import { useQuery } from "@tanstack/react-query";
import { companiesApi } from "../apis";

export function useCompanies(filters, page, limit) {
  return useQuery({
    queryKey: ["companies", filters, page],
    queryFn: () => companiesApi.list({ ...filters, page, limit }),
    placeholderData: (prev) => prev,
  });
}
