import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { escrowPaymentsApi } from "@/apis";

export function useCreateEscrowPayment() {
  return useMutation({
    mutationFn: (data) => escrowPaymentsApi.create(data),
    onError: () => {
      toast.error("결제 요청에 실패했습니다.");
    },
  });
}
