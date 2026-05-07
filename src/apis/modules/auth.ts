import { http } from "@/apis/http";
import { ENDPOINTS } from "@/apis/endpoints";

export interface RegisterSellerDto {
  companyName: string;
  representativeName: string;
  representativeEmail: string;
  representativePhone: string;
  password: string;
  exportItems: string[];
  industry?: string;
  tags?: string[];
  companyIntroduction: string;
  productIntroduction: string;
  websiteUrl?: string;
}

export interface RegisterBuyerDto {
  companyName: string;
  representativeName: string;
  representativeEmail: string;
  representativePhone: string;
  password: string;
  needs: string[];
  industries?: string[];
  tags?: string[];
  companyIntroduction: string;
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
