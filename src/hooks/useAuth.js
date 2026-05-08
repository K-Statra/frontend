import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi } from "@/apis/modules/auth";
import { useAuthStore } from "@/stores/authStore";

export function useLogin() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data) => authApi.login(data),
    onSuccess: (res) => {
      const { _id: companyId, name: companyName, type: role } = res.user;
      setAuth(companyId, companyName, role);
      toast.success("로그인됐습니다.");
      navigate("/");
    },
    onError: (err) => {
      const messages = err?.response?.data?.message?.message;
      if (Array.isArray(messages) && messages.length > 0) {
        toast.error(messages[0]);
      } else if (typeof messages === "string" && messages) {
        toast.error(messages);
      } else {
        toast.error("로그인에 실패했습니다.");
      }
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
      const { _id: companyId, name: companyName, type: role } = res;
      setAuth(companyId, companyName, role);
      toast.success("회원가입이 완료됐습니다.");
      navigate("/");
    },
    onError: (err) => {
      const messages = err?.response?.data?.message?.message;
      if (Array.isArray(messages) && messages.length > 0) {
        toast.error(messages[0]);
      } else if (typeof messages === "string" && messages) {
        toast.error(messages);
      } else {
        toast.error("회원가입에 실패했습니다.");
      }
    },
  });
}
