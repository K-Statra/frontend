import { http } from "@/apis/http";
import { ENDPOINTS } from "@/apis/endpoints";

export interface PartnerSearchParams {
  q?: string;
  limit?: number;
  industry?: string;
  country?: string;
  partnership?: string;
  size?: string;
  buyerId?: string;
}

export const partnersApi = {
  search: (params?: PartnerSearchParams) =>
    http.get(ENDPOINTS.partners.search, { params }),
};
