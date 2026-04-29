import { useQuery } from "@tanstack/react-query";
import { listCompanies } from "../apis/companies";

export function useCompanies(filters, page, limit) {
  return useQuery({
    queryKey: ["companies", filters, page],
    queryFn: () => listCompanies({ ...filters, page, limit }),
    placeholderData: (prev) => prev,
  });
}
