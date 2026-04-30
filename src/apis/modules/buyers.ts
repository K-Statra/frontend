import { http } from "../http";
import { ENDPOINTS } from "../endpoints";
import type { PaginatedResponse } from "../types";

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
};
