import { http } from "./client";

export const createConsultantRequest = (payload) =>
  http("/consultants/requests", { method: "POST", body: payload });

export const listConsultations = (params = {}) => {
  const q = new URLSearchParams(params);
  return http(`/consultations?${q.toString()}`);
};

export const createConsultation = (data) =>
  http("/consultations", { method: "POST", body: data });

export const updateConsultationStatus = (id, status) =>
  http(`/consultations/${id}/status`, { method: "PATCH", body: { status } });
