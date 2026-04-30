import { useQuery } from "@tanstack/react-query";
import { listBuyers } from "../apis/buyers";

export function useBuyers(params) {
  return useQuery({
    queryKey: ["buyers", params],
    queryFn: () => listBuyers(params),
  });
}
