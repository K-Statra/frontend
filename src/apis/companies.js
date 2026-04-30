import { http } from "./client";

export const listCompanies = (params = {}) => {
  const q = new URLSearchParams({ limit: "10", ...params });
  return http(`/companies?${q.toString()}`);
};

export const getCompany = (id) => http(`/companies/${id}`);

export const addImage = (companyId, data) =>
  http(`/companies/${companyId}/images`, { method: "POST", body: data });

export const deleteImage = (companyId, imageId) =>
  http(`/companies/${companyId}/images/${imageId}`, { method: "DELETE" });
