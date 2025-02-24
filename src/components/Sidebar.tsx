import {
  LayoutDashboard,
  Package,
  Satellite,
  Settings,
  Truck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "border-[#40c057] text-[#40c057] border"
      : "text-gray-500";

  return (
    <div className="p-6 bg-[#f7f7f7] dark:text-white dark:bg-[#1a1a1a] h-[100vh] fixed font-inter">
      <div className="flex gap-2.5 pb-12">
        <span className="font-bold text-[22px] pt-4">Cargo-pulse</span>
        <Truck className="w-8 h-8 rounded-full text-white bg-[#40c057] translate-y-4 py-1.5 px-1.5" />
      </div>
      <div className="flex flex-col gap-4">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 rounded-xl py-2 px-3 ${isActive(
            "/dashboard"
          )}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-[15px]">Dashboard</span>
        </Link>
        <Link
          to="/shipments"
          className={`flex items-center gap-3 rounded-xl py-2 px-3 ${isActive(
            "/shipments"
          )}`}
        >
          <Package className="w-4 h-4" />
          <span className="text-[15px]">Shipment Overview</span>
        </Link>
        <Link
          to="/real-time"
          className={`flex items-center gap-3 rounded-xl py-2 px-3 ${isActive(
            "/real-time"
          )}`}
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
