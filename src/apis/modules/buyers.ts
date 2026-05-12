import { http } from "@/apis/http";
import { ENDPOINTS } from "@/apis/endpoints";
import type { PaginatedResponse } from "@/apis/types";

export interface BuyerListParams {
  q?: string;
  country?: string;
  industry?: string;
  tag?: string;
  page?: number;
  limit?: number;
  sortBy?: "updatedAt" | "name";
  order?: "asc" | "desc";
}

export const buyersApi = {
  list: (params?: BuyerListParams) =>
    http.get<PaginatedResponse<unknown>>(ENDPOINTS.buyers.root, { params }),

  getById: (id: string) =>
    http.get(ENDPOINTS.buyers.byId(id)),

  create: (data: Record<string, unknown>) =>
    http.post(ENDPOINTS.buyers.root, data),
};
