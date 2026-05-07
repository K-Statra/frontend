import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/apis/modules/auth";
import { useAuthStore } from "@/stores/authStore";

export function useLogin() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data) => authApi.login(data),
    onSuccess: (res) => {
      const { companyId, companyName, role } = res.data;
      setAuth(companyId, companyName, role);
      navigate("/");
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: ({ type, ...data }) =>
      type === "buyer"
        ? authApi.registerBuyer(data)
        : authApi.registerSeller(data),
    onSuccess: (res) => {
      const { companyId, companyName, role } = res.data;
      setAuth(companyId, companyName, role);
      navigate("/");
    },
  });
}
