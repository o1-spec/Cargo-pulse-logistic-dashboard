import { Truck, PackageCheck, RefreshCw, Ban, Clock } from "lucide-react";
import Shipment from "./Shipment";
import { useShipmentContext } from "../context/useShipmentContext";

const ShipmentStats = () => {
  const { shipments } = useShipmentContext();

  return (
    <div className="grid grid-cols-5 gap-4 mb-8">
      <Shipment
        icon={<Truck />}
        label="Total Shipments"
        value={shipments.length}
        bgColor="bg-blue-500"
      />
      <Shipment
        icon={<Clock />}
        label="Pending"
        value={shipments.filter((s) => s.status === "Pending").length}
        bgColor="bg-blue-500"
      />
      <Shipment
        icon={<PackageCheck />}
        label="Delivered"
        value={shipments.filter((s) => s.status === "Delivered").length}
        bgColor="bg-green-500"
      />
      <Shipment
        icon={<RefreshCw />}
        label="In Transit"
        value={shipments.filter((s) => s.status === "In Transit").length}
        bgColor="bg-yellow-500"
      />
      <Shipment
        icon={<Ban />}
        label="Cancelled"
        value={shipments.filter((s) => s.status === "Cancelled").length}
        bgColor="bg-red-500"
      />
    </div>
  );
};

export default ShipmentStats;
