import { Truck, PackageCheck, RefreshCw, Ban, Clock } from "lucide-react";
import Shipment from "./Shipment";
import { useShipmentContext } from "../context/useShipmentContext";

const ShipmentStats = () => {
  const { shipments } = useShipmentContext();

  return (
    <div className="grid grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4 mb-8">
      <Shipment
        icon={<Truck className="md:w-fit w-4" />}
        label="Total Shipments"
        value={shipments.length}
        bgColor="bg-blue-500"
      />
      <Shipment
        icon={<Clock className="md:w-fit w-4" />}
        label="Pending"
        value={shipments.filter((s) => s.status === "Pending").length}
        bgColor="bg-blue-500"
      />
      <Shipment
        icon={<PackageCheck className="md:w-fit w-4" />}
        label="Delivered"
        value={shipments.filter((s) => s.status === "Delivered").length}
        bgColor="bg-green-500"
      />
      <Shipment
        icon={<RefreshCw className="md:w-fit w-4" />}
        label="In Transit"
        value={shipments.filter((s) => s.status === "In Transit").length}
        bgColor="bg-yellow-500"
      />
      <Shipment
        icon={<Ban className="md:w-fit w-4" />}
        label="Cancelled"
        value={shipments.filter((s) => s.status === "Cancelled").length}
        bgColor="bg-red-500"
      />
    </div>
  );
};

export default ShipmentStats;
