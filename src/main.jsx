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
import RolePermissions from "./dashboard/pages/Admin/super-admin-site/system-management/Role&Permissions";
import SystemSetting from "./dashboard/pages/Admin/super-admin-site/system-management/SystemSetting";
import UserManagement from "./dashboard/pages/Admin/super-admin-site/system-management/UserManagement";
import TurfCreateForm from "./dashboard/pages/Admin/turfs-management/TurfCreateForm";
import TurfManagement from "./dashboard/pages/Admin/turfs-management/TurfManagement";
import LoginAuthenticated from "./dashboard/pages/login/LoginAuthenticated";
import LoginDashboard from "./dashboard/pages/login/LoginDashboard";
import LoginForm from "./features/auth/LoginForm";
import RegisterForm from "./features/auth/RegisterForm";
import "./index.css";
import DashboardLayout from "./layouts/main/DashboardLayout";
import LoginLayout from "./layouts/main/LoginLayout";
import MainLayout from "./layouts/main/MainLayout";
import About from "./pages/About";
import FootballTurfLanding from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import FootballTurfBooking from "./pages/book-now/FootballTurfBooking";
import Contact from "./pages/contact/Contact";
import OurTurfs from "./pages/our-turfs/OurTurfs";
const queryClient = new QueryClient();
 
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route index element={<FootballTurfLanding />} />
        <Route path="about" element={<About />} />
        <Route path="our-turfs" element={<OurTurfs />} />
        <Route path="our-turfs/id?/:id" element={<FootballTurfBooking />} />
        {/* <Route path="book-now" element={<BookNow />} /> */}
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Authentication routes for users */}
      <Route path="user" element={<LoginLayout />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Route>

      {/* Authentication routes for admin and super_admin */}
      <Route path="auth" element={<LoginLayout />}>
        <Route path="login" element={<LoginDashboard />} />
        <Route path="authenticated" element={<LoginAuthenticated />} />
      </Route>

      {/* Protected dashboard routes */}
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        {/* super_admin routes */}
        <Route path="user-management" element={<UserManagement />} />
        <Route path="roles-permissions" element={<RolePermissions />} />
        <Route path="system-settings" element={<SystemSetting />} />

        {/* admin routes */}
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
      </Route>
      <Route path="*" element={<PageNotFound />} />

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
