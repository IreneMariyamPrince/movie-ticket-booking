import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/Landing/LandingPage";
import AdminLoginPage from "./components/pages/Authentication/AdminLoginPage";
import AdminDashboardPage from "./components/pages/Admin/AdminDashboardPage";
import AdminTemplate from "./components/templates/AdminTemplate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRouteProtection from "./routes/AdminRouteProtection";
import AuthenticatedRouteProtection from "./routes/AuthenticatedRouteProtection";
import UsersPage from "./components/pages/Admin/UsersPage";
import MoviesPage from "./components/pages/Admin/MoviesPage";
import CastPage from "./components/pages/Admin/CastPage";
import CrewPage from "./components/pages/Admin/CrewPage";
import AdminResetPasswordPage from "./components/pages/Authentication/AdminResetPasswordPage";
import ShowOwnersLoginPage from "./components/pages/Authentication/ShowOwnersLoginPage";
import ShowOwnersRegisterPage from "./components/pages/Authentication/ShowOwnersRegisterPage";
import ShowOwnersVerifyOtpPage from "./components/pages/Authentication/ShowOwnersVerifyOtpPage";
import AccountSetupPage from "./components/pages/ShowOwners/AccountSetupPage";
import ShowOwnerRouteProtection from "./routes/ShowOwnerRouteProtection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/show/login" element={<ShowOwnersLoginPage />} />
        <Route path="/show/register" element={<ShowOwnersRegisterPage />} />
        <Route path="/show/verifyOtp" element={<ShowOwnersVerifyOtpPage />} />

        <Route element={<ShowOwnerRouteProtection />}>
          <Route path="/show/accountSetup" element={<AccountSetupPage />} />
        </Route>

        <Route element={<AuthenticatedRouteProtection />}>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/resetPassword"
            element={<AdminResetPasswordPage />}
          />
        </Route>

        <Route element={<AdminRouteProtection />}>
          <Route
            path="/admin/dashboard"
            element={
              <AdminTemplate>
                <AdminDashboardPage />
              </AdminTemplate>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminTemplate>
                <UsersPage />
              </AdminTemplate>
            }
          />
          <Route
            path="/admin/movies"
            element={
              <AdminTemplate>
                <MoviesPage />
              </AdminTemplate>
            }
          />
          <Route
            path="/admin/cast"
            element={
              <AdminTemplate>
                <CastPage />
              </AdminTemplate>
            }
          />
          <Route
            path="/admin/crew"
            element={
              <AdminTemplate>
                <CrewPage />
              </AdminTemplate>
            }
          />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
