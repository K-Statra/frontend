const PROD_API = "https://web-production-9ceeb.up.railway.app";
const BASE =
  import.meta?.env?.VITE_API_BASE ||
  (import.meta.env.PROD ? PROD_API : "http://localhost:4000");

export async function http(path, { method = "GET", headers = {}, body } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let errData;
    try {
      errData = await res.json();
    } catch {
      errData = { message: res.statusText };
    }
    const error = new Error(errData.message || "Request failed");
    if (errData?.details) error.details = errData.details;
    error.status = res.status;
    throw error;
  }
  try {
    return await res.json();
  } catch {
    return {};
  }
}

export const BASE_URL = BASE;

export function newIdemKey() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now();
}
