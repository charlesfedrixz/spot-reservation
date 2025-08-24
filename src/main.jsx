import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BlockedSlots from "./dashboard/pages/Admin/bookings-management/BlockedSlots";
import BookingManagement from "./dashboard/pages/Admin/bookings-management/BookingManagement";
import CustomerManagement from "./dashboard/pages/Admin/customers-management/CustomerManagement";
import Dashboard from "./dashboard/pages/Admin/overview/Dashboard";
import TurfCreateForm from "./dashboard/pages/Admin/turfs-management/TurfCreateForm";
import TurfManagement from "./dashboard/pages/Admin/turfs-management/TurfManagement";
import LoginAuthenticated from "./dashboard/pages/login/LoginAuthenticated";
import LoginDashboard from "./dashboard/pages/login/LoginDashboard";
import LoginLayout from "./features/auth/LoginLayout";
import "./index.css";
import DashboardLayout from "./layouts/main/DashboardLayout";
import MainLayout from "./layouts/main/MainLayout";
import About from "./pages/About";
import FootballTurfLanding from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route index element={<FootballTurfLanding />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* Authentication routes */}
      <Route path="auth" element={<LoginLayout />}>
        <Route path="login" element={<LoginDashboard />} />
        <Route path="authenticated" element={<LoginAuthenticated />} />
      </Route>

      {/* Protected dashboard routes */}
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="booking-management">
          <Route index element={<BookingManagement />} />
          <Route path="blocked-slots" element={<BlockedSlots />} />
          {/* Future nested routes can go here */}
        </Route>
        <Route path="customers-management" element={<CustomerManagement />} />
        <Route path="turf-management">
          <Route index element={<TurfManagement />} />
          <Route path="create-turf" element={<TurfCreateForm />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Route>

      {/* Catch all route for 404 */}
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ToastContainer />
  </QueryClientProvider>
);
