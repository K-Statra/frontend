import { http } from "@/apis/http";
import { ENDPOINTS } from "@/apis/endpoints";

export interface EscrowItemDto {
  label: string;
  amountXrp: number;
  order: number;
  requiredEventTypes: string[];
}

export interface CreateEscrowPaymentDto {
  counterpartyWalletAddress: string;
  memo?: string;
  currency?: "XRP" | "RLUSD";
  escrows: EscrowItemDto[];
}

export const escrowPaymentsApi = {
  create: (data: CreateEscrowPaymentDto) =>
    http.post(ENDPOINTS.escrowPayments.root, data),

  getList: (params: { group?: string; page?: number; limit?: number } = {}) =>
    http.get(ENDPOINTS.escrowPayments.root, { params }),

  getById: (id: string) =>
    http.get(ENDPOINTS.escrowPayments.byId(id)),

  approve: (id: string, action?: "ACCEPT" | "REJECT") =>
    http.post(ENDPOINTS.escrowPayments.approve(id), action ? { action } : undefined),

  approveEvent: (id: string, escrowId: string, type: string) =>
    http.post(ENDPOINTS.escrowPayments.approveEvent(id, escrowId, type)),

  pay: (id: string) =>
    http.post(ENDPOINTS.escrowPayments.pay(id)),

  findUserByWallet: (address: string) =>
    http.get(ENDPOINTS.escrowPayments.userByWallet(address)),
};
