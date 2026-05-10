import { useQuery } from "@tanstack/react-query";
import { partnersApi } from "@/apis";

export function usePartnerSearch(q, options = {}) {
  return useQuery({
    queryKey: ["partners", "search", q],
    queryFn: () => partnersApi.search({ q }),
    enabled: !!q,
    ...options,
  });
}
