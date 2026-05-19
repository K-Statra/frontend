import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LandingPage from "@/pages/LandingPage.jsx";
import LoginPage from "@/pages/LoginPage.jsx";
import RegisterPage from "@/pages/RegisterPage.jsx";
import Matches from "@/pages/Matches.jsx";
import PaymentsPage from "@/pages/payment/PaymentsPage.jsx";
import SchedulePage from "@/pages/schedule/SchedulePage.jsx";
import CreatePayment from "@/pages/payment/CreatePayment.jsx";
import MyBusiness from "@/pages/myBusiness/MyBusiness.jsx";

function NotFound() {
  const location = useLocation();
  return (
    <div>
      <h2>404</h2>
      <p>Page not found: {location.pathname}</p>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/payments/create" element={<CreatePayment />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/my-business" element={<MyBusiness />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
