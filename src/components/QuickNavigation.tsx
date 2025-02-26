import { MapPin, Package } from "lucide-react";
import { Link } from "react-router-dom";

function QuickNavigation() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      <Link
        to="/shipments"
        className="p-4 bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-1"
      >
        <Package className="w-6 h-6 text-blue-500" />
        <span className="md:text-lg text-md font-semibold">View Shipments</span>
      </Link>
      <Link
        to="/real-time"
        className="p-4 bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-1"
      >
        <MapPin className="w-6 h-6 text-green-500" />
        <span className="md:text-lg text-md font-semibold">
          Track Shipments
        </span>
      </Link>
    </div>
  );
}

export default QuickNavigation;
