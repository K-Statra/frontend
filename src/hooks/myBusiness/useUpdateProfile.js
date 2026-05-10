import { useMutation, useQueryClient } from "@tanstack/react-query";
import { myBusinessApi } from "@/apis";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => myBusinessApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
    },
  });
}
