import { useQuery } from "@tanstack/react-query";
import { partnersApi } from "@/apis";

export function usePartnerSearch(q, options = {}) {
  const normalizedQ = q.trim();
  return useQuery({
    queryKey: ["partners", "search", normalizedQ],
    queryFn: () => partnersApi.search({ q: normalizedQ }),
    enabled: !!normalizedQ,
    ...options,
  });
}
