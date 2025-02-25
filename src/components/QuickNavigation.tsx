import { MapPin, Package } from "lucide-react";
import { Link } from "react-router-dom";

function QuickNavigation() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Link
        to="/shipments"
        className="p-4 bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md flex items-center gap-3"
      >
        <Package className="w-6 h-6 text-blue-500" />
        <span className="text-lg font-semibold">View Shipments</span>
      </Link>
      <Link
        to="/real-time"
        className="p-4 bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md flex items-center gap-3"
      >
        <MapPin className="w-6 h-6 text-green-500" />
        <span className="text-lg font-semibold">Track Shipments</span>
      </Link>
    </div>
  );
}

export default QuickNavigation;
