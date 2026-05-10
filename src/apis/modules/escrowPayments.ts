import { http } from "@/apis/http";
import { ENDPOINTS } from "@/apis/endpoints";

export interface EscrowItemDto {
  label: string;
  amountXrp: number;
  order: number;
  requiredEventTypes: string[];
}

export interface CreateEscrowPaymentDto {
  buyerId: string;
  sellerWalletAddress: string;
  memo?: string;
  currency?: "XRP" | "RLUSD";
  escrows: EscrowItemDto[];
}

export const escrowPaymentsApi = {
  create: (data: CreateEscrowPaymentDto) =>
    http.post(ENDPOINTS.escrowPayments.root, data),

  getById: (id: string) =>
    http.get(ENDPOINTS.escrowPayments.byId(id)),

  approve: (id: string) =>
    http.post(ENDPOINTS.escrowPayments.approve(id)),

  pay: (id: string) =>
    http.post(ENDPOINTS.escrowPayments.pay(id)),
};
