import { useQuery } from "@tanstack/react-query";
import { getMatches } from "../apis/matches";

export function useMatches(buyerId, limit, { enabled = true } = {}) {
  return useQuery({
    queryKey: ["matches", buyerId, limit],
    queryFn: () => getMatches(buyerId, limit),
    enabled: enabled && !!buyerId,
  });
}
