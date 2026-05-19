export const ENDPOINTS = {
  auth: {
    registerSeller: "/auth/register/seller",
    registerBuyer: "/auth/register/buyer",
    login: "/auth/login",
    logout: "/auth/logout",
  },
  partners: {
    search: "/partners/search",
  },
  myBusiness: {
    profile: "/my-business/profile",
    partners: "/my-business/partners",
    partnerById: (id: string) => `/my-business/partners/${id}`,
  },
  escrowPayments: {
    root: "/escrow-payments",
    byId: (id: string) => `/escrow-payments/${id}`,
    approve: (id: string) => `/escrow-payments/${id}/approve`,
    pay: (id: string) => `/escrow-payments/${id}/pay`,
    userByWallet: (address: string) =>
      `/escrow-payments/users/wallet/${address}`,
    approveEvent: (id: string, escrowId: string, type: string) =>
      `/escrow-payments/${id}/escrows/${escrowId}/events/${encodeURIComponent(type)}/approve`,
  },
};
