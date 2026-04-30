import { useQuery } from "@tanstack/react-query";
import { buyersApi } from "../apis";

export function useBuyers(params) {
  return useQuery({
    queryKey: ["buyers", params],
    queryFn: () => buyersApi.list(params),
  });
}
