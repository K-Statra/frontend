import { http } from "../http";
import { ENDPOINTS } from "../endpoints";

export interface SubmitFeedbackDto {
  rating: number;
  comments?: string;
  locale?: string;
  source?: string;
}

export const matchesApi = {
  list: (buyerId: string, limit?: number) =>
    http.get(ENDPOINTS.matches.root, { params: { buyerId, limit } }),

  submitFeedback: (companyId: string, data: SubmitFeedbackDto) =>
    http.post(ENDPOINTS.matches.feedback(companyId), data),
};
