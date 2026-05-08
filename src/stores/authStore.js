import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      companyId: "",
      companyName: "",
      role: "",
      isLoggedIn: false,
      setAuth: (companyId, companyName, role) =>
        set({ companyId, companyName, role, isLoggedIn: true }),
      clearAuth: () =>
        set({ companyId: "", companyName: "", role: "", isLoggedIn: false }),
    }),
    {
      name: "kstatra-auth",
      partialize: (state) => ({
        companyId: state.companyId,
        companyName: state.companyName,
        role: state.role,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);
