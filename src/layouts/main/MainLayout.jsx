import ScrollToTop from "@/components/scrollToTop/ScrollToTop";
import LocationPermission from "@/components/ui/LocationPermission";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function MainLayout() {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  return (
    <div>
      <Header user={user} setUser={setUser} />
      <LocationPermission />
      <div className="  bg-backgroundColor  min-h-[calc(100vh-64px)]">
        <ScrollToTop />
        <Outlet />
      </div>
      <Footer />
      {/* <FootballTurfLanding/> */}
    </div>
  );
}
