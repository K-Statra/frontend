import { Route, Routes } from "react-router-dom";
import LandingPage from "@/pages/landing/LandingPage.jsx";
import LoginPage from "@/pages/auth/LoginPage.jsx";
import RegisterPage from "@/pages/auth/RegisterPage.jsx";
import Matches from "@/pages/matches/Matches.jsx";
import PaymentsPage from "@/pages/payment/PaymentsPage.jsx";
import SchedulePage from "@/pages/schedule/SchedulePage.jsx";
import CreatePayment from "@/pages/payment/CreatePayment.jsx";
import MyBusiness from "@/pages/myBusiness/MyBusiness.jsx";
import NotFoundPage from "@/pages/error/NotFoundPage.jsx";

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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
