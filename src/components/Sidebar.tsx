import {
  LayoutDashboard,
  Package,
  Satellite,
  Settings,
  Truck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarTypes {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarTypes) {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "border-[#40c057] text-[#40c057] border"
      : "text-gray-500";

  return (
    <div
      className={`py-6 pl-4 pr-4 bg-[#f7f7f7] dark:text-white dark:bg-[#1a1a1a] h-[100vh] fixed xl:w-[18%] top-0 z-80 left-0 -translate-x-[100%] duration-400 transition-all xl:translate-x-0 font-inter ${
        isSidebarOpen && "translate-x-0"
      }`}
    >
      <div className="flex gap-2.5 pb-12">
        <span className="font-bold text-[22px] pt-4">Cargo-pulse</span>
        <Truck className="w-8 h-8 rounded-full text-white bg-[#40c057] translate-y-4 py-1.5 px-1.5" />
      </div>
      <div className="flex flex-col gap-4">
        <Link
          to="/"
          className={`flex items-center gap-3 rounded-xl py-2 px-3 ${isActive(
            "/"
          )}`}
          onClick={toggleSidebar}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-[15px]">Dashboard</span>
        </Link>
        <Link
          to="/shipments"
          className={`flex items-center gap-3 rounded-xl py-2 px-3 ${isActive(
            "/shipments"
          )}`}
          onClick={toggleSidebar}
        >
          <Package className="w-4 h-4" />
          <span className="text-[15px]">Shipment Overview</span>
        </Link>
        <Link
          to="/real-time"
          className={`flex items-center gap-3 rounded-xl py-2 px-3 ${isActive(
            "/real-time"
          )}`}
          onClick={toggleSidebar}
        >
          <Satellite className="w-4 h-4" />
          <span className="text-[15px]">Real Time Updates</span>
        </Link>
        <Link
          to="/settings"
          className={`flex items-center gap-3 rounded-xl py-2 px-3 ${isActive(
            "/settings"
          )}`}
        >
          <Settings className="w-4 h-4" />
          <span className="text-[15px]">Settings</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
