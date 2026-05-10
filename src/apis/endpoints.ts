export const ENDPOINTS = {
  auth: {
    registerSeller: "/auth/register/seller",
    registerBuyer: "/auth/register/buyer",
    login: "/auth/login",
    logout: "/auth/logout",
  },
  payments: {
    root: "/payments",
    summary: "/payments/summary",
    recent: "/payments/recent",
    byId: (id: string) => `/payments/${id}`,
    refresh: (id: string) => `/payments/${id}/refresh`,
  },
  companies: {
    root: "/companies",
    byId: (id: string) => `/companies/${id}`,
  },
  partners: {
    search: "/partners/search",
  },
  matches: {
    root: "/matches",
    feedback: (companyId: string) => `/matches/${companyId}/feedback`,
  },
  buyers: {
    root: "/buyers",
    byId: (id: string) => `/buyers/${id}`,
  },
  consultations: {
    root: "/consultations",
    status: (id: string) => `/consultations/${id}/status`,
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
  },
};
