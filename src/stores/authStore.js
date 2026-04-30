import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      buyerId: "",
      buyerName: "",
      loginModalOpen: false,
      setAuth: (buyerId, buyerName) => set({ buyerId, buyerName }),
      clearAuth: () =>
        set({ buyerId: "", buyerName: "", loginModalOpen: false }),
      openLoginModal: () => set({ loginModalOpen: true }),
      closeLoginModal: () => set({ loginModalOpen: false }),
    }),
    { name: "kstatra-auth" },
  ),
);
