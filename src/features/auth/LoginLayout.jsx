import { Outlet } from "react-router-dom";

export default function LoginLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-green-400 to-purple-400 ">
      <Outlet />
    </div>
  );
}
