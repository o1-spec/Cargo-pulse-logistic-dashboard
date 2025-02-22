import {
  LayoutDashboard,
  Package,
  Satellite,
  Settings,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="p-6 bg-[#fcfcfc] h-[100vh] font-inter">
      <div className="flex gap-2.5">
        <span className="font-bold text-[22px] pb-16 pt-4">Cargo-pulse</span>
        <Truck className="w-8 h-8 rounded-full text-white bg-[#40c057] translate-y-4 py-1.5 px-1.5" />
      </div>
      <div className="flex flex-col gap-8">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 rounded-xl border border-[#40c057] py-2 text-[#40c057] px-3"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-[15px]">Dashboard</span>
        </Link>
        <Link to="/shipments" className="flex items-center gap-3">
          <Package className="w-4 h-4 text-gray-500" />
          <span className="text-[15px]">Shipment Overview</span>
        </Link>
        <Link to="/real-time" className="flex items-center gap-3">
          <Satellite className="w-4 h-4 text-gray-500" />
          <span className="text-[15px]">Real Time Updates</span>
        </Link>
        <Link to="/settings" className="flex items-center gap-3">
          <Settings className="w-4 h-4 text-gray-500" />
          <span className="text-[15px]">Settings</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
