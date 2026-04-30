import { http } from "../http";
import { ENDPOINTS } from "../endpoints";
import type { PaginatedResponse } from "../types";

export interface LocationDto {
  city?: string;
  state?: string;
  country?: string;
}

export interface CreateCompanyDto {
  name: string;
  industry?: string;
  exportItems?: string[];
  tags?: string[];
  companyIntroduction?: string;
  productIntroduction?: string;
  websiteUrl?: string;
  location?: LocationDto;
  sizeBucket?: "1-10" | "11-50" | "51-200" | "201-1000" | "1000+";
}

export type UpdateCompanyDto = Partial<CreateCompanyDto>;

export interface CompanyListParams {
  q?: string;
  industry?: string;
  tag?: string;
  country?: string;
  size?: "1-10" | "11-50" | "51-200" | "201-1000" | "1000+";
  partnership?: string;
  page?: number;
  limit?: number;
  sortBy?: "updatedAt" | "name" | "nameNumeric";
  order?: "asc" | "desc";
}

export const companiesApi = {
  list: (params?: CompanyListParams) =>
    http.get<PaginatedResponse<unknown>>(ENDPOINTS.companies.root, { params }),

  getById: (id: string) =>
    http.get(ENDPOINTS.companies.byId(id)),

  create: (data: CreateCompanyDto) =>
    http.post(ENDPOINTS.companies.root, data),

  update: (id: string, data: UpdateCompanyDto) =>
    http.patch(ENDPOINTS.companies.byId(id), data),

  remove: (id: string) =>
    http.delete(ENDPOINTS.companies.byId(id)),
};
