import ScrollToTop from "@/components/scrollToTop/ScrollToTop";
import LocationPermission from "@/components/ui/LocationPermission";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useState } from "react";

export default function MainLayout() {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const location = useLocation()
  const path = location.pathname;
  console.log("Current Path:", path);
  return (
    <div >
      <Header user={user} setUser={setUser} />
      <LocationPermission />
      <div className="bg-[rgb(238,246,241)]  min-h-[calc(100vh-64px)]">
        <ScrollToTop />
        <Outlet />
      </div>
      <Footer />
      {/* <FootballTurfLanding/> */}
    </div>
  );
}
