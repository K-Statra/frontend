import { useQuery } from "@tanstack/react-query";
import { myBusinessApi } from "@/apis";

export function useMyProfile() {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: () => myBusinessApi.getProfile(),
    staleTime: 5 * 60 * 1000,
  });
}
