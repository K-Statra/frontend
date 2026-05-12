import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LandingPage from "@/pages/LandingPage.jsx";
import LoginPage from "@/pages/LoginPage.jsx";
import RegisterPage from "@/pages/RegisterPage.jsx";
import Overview from "@/pages/Overview.jsx";
import PartnerSearch from "@/pages/PartnerSearch.jsx";
import Partners from "@/pages/Partners.jsx";
import CompanyList from "@/pages/CompanyList.jsx";
import BuyerForm from "@/pages/BuyerForm.jsx";
import CompanyInputForm from "@/pages/CompanyInputForm.jsx";
import Matches from "@/pages/Matches.jsx";
import PaymentsPage from "@/pages/payment/PaymentsPage.jsx";
import SchedulePage from "@/pages/schedule/SchedulePage.jsx";
import PaymentCheckout from "@/pages/PaymentCheckout.jsx";
import PaymentStatus from "@/pages/PaymentStatus.jsx";
import AdminPayments from "@/pages/AdminPayments.jsx";
import AdminMatches from "@/pages/AdminMatches.jsx";
import AdminStats from "@/pages/AdminStats.jsx";
import ContactPage from "@/pages/ContactPage.jsx";
import About from "@/pages/About.jsx";
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
      <Route path="/overview" element={<Overview />} />
      <Route path="/dashboard" element={<Overview />} />
      <Route path="/analytics" element={<Overview />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/companies" element={<CompanyList />} />
      <Route path="/companies/new" element={<CompanyInputForm />} />
      <Route path="/buyers/new" element={<BuyerForm />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/matches/detail" element={<ContactPage />} />
      <Route path="/payments/checkout/:id" element={<PaymentCheckout />} />
      <Route path="/payments/:id" element={<PaymentStatus />} />
      <Route path="/admin/payments" element={<AdminPayments />} />
      <Route path="/admin/matches" element={<AdminMatches />} />
      <Route path="/admin/stats" element={<AdminStats />} />
      <Route path="/payments/create" element={<CreatePayment />} />
      <Route path="/my-business" element={<MyBusiness />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
