import { http } from "../http";
import { ENDPOINTS } from "../endpoints";

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
