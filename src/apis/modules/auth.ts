import { http } from "@/apis/http";
import { ENDPOINTS } from "@/apis/endpoints";

export interface RegisterSellerDto {
  sellerName: string;
  representativeName: string;
  representativeEmail: string;
  representativePhone: string;
  password: string;
  exportItems: string[];
  industry?: string;
  tags?: string[];
  sellerIntroduction: string;
  productIntroduction: string;
  websiteUrl?: string;
}

export interface RegisterBuyerDto {
  sellerName: string;
  representativeName: string;
  representativeEmail: string;
  representativePhone: string;
  password: string;
  needs: string[];
  industries?: string[];
  tags?: string[];
  sellerIntroduction: string;
  productIntroduction: string;
  websiteUrl?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export const authApi = {
  registerSeller: (data: RegisterSellerDto) =>
    http.post(ENDPOINTS.auth.registerSeller, data),

  registerBuyer: (data: RegisterBuyerDto) =>
    http.post(ENDPOINTS.auth.registerBuyer, data),

  login: (data: LoginDto) =>
    http.post(ENDPOINTS.auth.login, data),

  logout: () =>
    http.post(ENDPOINTS.auth.logout),
};
