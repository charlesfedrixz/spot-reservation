import Header from "@/dashboard/components/header/Header";
import Sidebar from "@/dashboard/components/sidebar/Sidebar";
import { Suspense, useLayoutEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole, setUserRole] = useState("admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  function MainContent() {
    const location = useLocation();

    // The window.scrollTo(0,0) wasn't working because the scroll container is the SidebarInset element, not the window
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useLayoutEffect(() => {
      const scrollContainer = document.querySelector(".overflow-y-auto");
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
      }
    }, [location.pathname]);

    if (location.pathname === "/") {
      return <Navigate to="/dashboard" />;
    }

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <main
          id="main-content"
          className="flex-1  px-4  pt-5  sm:px-10 flex flex-col  "
        >
          <Outlet />
        </main>
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        userRole={userRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block fixed md:static z-30`}
      />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userRole={userRole}
          setUserRole={setUserRole}
          setSidebarOpen={setSidebarOpen}
          className="z-20 sticky top-0"
        />

        {/* Main content with proper scrolling */}
        <div className="flex-1 overflow-x-hidden">
          <div className="h-full overflow-y-auto">
            <MainContent />
          </div>
        </div>
      </div>
    </div>
  );
}
