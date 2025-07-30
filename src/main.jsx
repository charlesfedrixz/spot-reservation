import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginAuthenticated from "./dashboard/pages/login/LoginAuthenticated";
import LoginDashboard from "./dashboard/pages/login/LoginDashboard";
import TurfCreateForm from "./dashboard/pages/turfs/TurfCreateForm";
import TurfManagement from "./dashboard/pages/turfs/TurfManagement";
import LoginForm from "./features/auth/LoginForm";
import LoginLayout from "./features/auth/LoginLayout";
import RegisterForm from "./features/auth/RegisterForm";
import "./index.css";
import DashboardLayout from "./layouts/main/DashboardLayout";
import MainLayout from "./layouts/main/MainLayout";
import About from "./pages/About";
import FootballTurfLanding from "./pages/Home";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<FootballTurfLanding />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />

      {/* Separate route for dashboard login */}
      <Route path="/auth" element={<LoginLayout />}>
        <Route path="login" element={<LoginDashboard />} />
        <Route path="authenticated" element={<LoginAuthenticated />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="turf-management" element={<TurfManagement />} />
        <Route
          path="turf-management/create-turf"
          element={<TurfCreateForm />}
        />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ToastContainer />
  </QueryClientProvider>
);
