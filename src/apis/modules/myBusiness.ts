import { http } from "@/apis/http";
import { ENDPOINTS } from "@/apis/endpoints";

export const myBusinessApi = {
  getProfile: () => http.get(ENDPOINTS.myBusiness.profile),
  updateProfile: (data: Record<string, unknown>) =>
    http.put(ENDPOINTS.myBusiness.profile, data),
  getPartners: (params?: { page?: number; limit?: number }) =>
    http.get(ENDPOINTS.myBusiness.partners, { params }),
  savePartner: (data: { partnerId: string; partnerType: "seller" | "buyer" }) =>
    http.post(ENDPOINTS.myBusiness.partners, data),
  removePartner: (partnerId: string) =>
    http.delete(ENDPOINTS.myBusiness.partnerById(partnerId)),
};
