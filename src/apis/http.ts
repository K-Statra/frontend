import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? "https://backend-production-601f2.up.railway.app"
    : "http://localhost:4000");

export const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 401 && window.location.pathname !== "/login") {
      window.location.href = "/login";
    } else if (status === 403) {
      toast.error(message || "접근 권한이 없습니다.");
    } else if (status >= 500) {
      toast.error(message || "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }

    return Promise.reject(error);
  },
);

export function newIdemKey() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now();
}
