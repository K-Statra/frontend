import { http } from "../http";
import { ENDPOINTS } from "../endpoints";

export interface CreateConsultationDto {
  buyerId: string;
  companyId: string;
  reqType?: "ONLINE" | "OFFLINE";
  date: string;
  timeSlot: string;
  message?: string;
}

export interface ConsultationListParams {
  buyerId?: string;
  companyId?: string;
}

export type ConsultationStatus =
  | "REQUESTED"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | "PAYMENT_PENDING";

export const consultationsApi = {
  create: (data: CreateConsultationDto) =>
    http.post(ENDPOINTS.consultations.root, data),

  list: (params?: ConsultationListParams) =>
    http.get(ENDPOINTS.consultations.root, { params }),

  updateStatus: (id: string, status: ConsultationStatus) =>
    http.patch(ENDPOINTS.consultations.status(id), { status }),
};
