import { useState } from "react";
import { ShipmentType } from "../types/ShipmentType";
import ShipmentStats from "../components/ShipmentStats";
import ShipmentDetailsModal from "../components/ShipmentDetailsModal";
import ShipmentAnalytics from "../components/ShipmentAnalytics";
import QuickNavigation from "../components/QuickNavigation";
import RecentShipments from "../components/RecentShipments";

function Dashboard() {
  const [selectedShipment, setSelectedShipment] = useState<ShipmentType | null>(
    null
  );

  const openShipmentDetails = (shipment: ShipmentType) => {
    setSelectedShipment(shipment);
  };

  const closeShipmentDetails = () => {
    setSelectedShipment(null);
  };

  return (
    <div className="py-6 sm:px-6 px-2 w-full min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Shipment Stats Overview */}
      <ShipmentStats />

      {/*  Shipment Analytics */}
      <ShipmentAnalytics />

      {/* 📦 Recent Shipments */}
      <RecentShipments openShipmentDetails={openShipmentDetails} />

      {/* Shipment Details Modal */}
      {selectedShipment && (
        <ShipmentDetailsModal
          selectedShipment={selectedShipment}
          closeShipmentDetails={closeShipmentDetails}
        />
      )}

      {/* 🔗 Quick Navigation */}
      <QuickNavigation />
    </div>
  );
}

export default Dashboard;
