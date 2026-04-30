import { useQuery } from "@tanstack/react-query";
import { listConsultations } from "../apis/consultants";

export function useConsultations() {
  return useQuery({
    queryKey: ["consultations"],
    queryFn: () => listConsultations(),
  });
}
