import { useQuery } from "@tanstack/react-query";
import { matchesApi } from "@/apis";

export function useMatches(buyerId, limit, { enabled = true } = {}) {
  return useQuery({
    queryKey: ["matches", buyerId, limit],
    queryFn: () => matchesApi.list(buyerId, limit),
    enabled: enabled && !!buyerId,
  });
}
