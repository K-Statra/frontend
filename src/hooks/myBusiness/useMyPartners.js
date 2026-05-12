import { useQuery } from "@tanstack/react-query";
import { myBusinessApi } from "@/apis";

export function useMyPartners(page = 1) {
  return useQuery({
    queryKey: ["my-partners", page],
    queryFn: () => myBusinessApi.getPartners({ page, limit: 10 }),
  });
}
