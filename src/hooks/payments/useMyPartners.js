import { useQuery } from "@tanstack/react-query";
import { myBusinessApi } from "@/apis";

export function useMyPartners() {
  return useQuery({
    queryKey: ["my-partners"],
    queryFn: () => myBusinessApi.getPartners(),
  });
}
