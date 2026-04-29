import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      buyerId: "",
      buyerName: "",
      setAuth: (buyerId, buyerName) => set({ buyerId, buyerName }),
      clearAuth: () => set({ buyerId: "", buyerName: "" }),
    }),
    { name: "kstatra-auth" },
  ),
);
