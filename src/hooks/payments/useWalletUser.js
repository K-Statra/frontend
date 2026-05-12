import { useQuery } from "@tanstack/react-query";
import { escrowPaymentsApi } from "@/apis";

export function useWalletUser(address) {
  return useQuery({
    queryKey: ["wallet-user", address],
    queryFn: () => escrowPaymentsApi.findUserByWallet(address),
    enabled: !!address,
    retry: false,
  });
}
