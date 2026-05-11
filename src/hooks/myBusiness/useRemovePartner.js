import { useMutation, useQueryClient } from "@tanstack/react-query";
import { myBusinessApi } from "@/apis";

export function useRemovePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (partnerId) => myBusinessApi.removePartner(partnerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-partners"] });
    },
  });
}
