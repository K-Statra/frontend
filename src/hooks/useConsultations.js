import { useQuery } from "@tanstack/react-query";
import { consultationsApi } from "../apis";

export function useConsultations() {
  return useQuery({
    queryKey: ["consultations"],
    queryFn: () => consultationsApi.list(),
  });
}
