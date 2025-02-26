import { useState, useMemo } from "react";
import { useShipmentContext } from "../context/useShipmentContext";
import { ShipmentType } from "../types/ShipmentType";
import ShipmentStats from "../components/ShipmentStats";
import ShipmentTable from "../components/ShipmentTable";
import ShipmentDetailsModal from "../components/ShipmentDetailsModal";
import ShipmentFilters from "../components/ShipmentFilters";

function Shipments() {
  const { shipments } = useShipmentContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [selectedShipment, setSelectedShipment] = useState<ShipmentType | null>(
    null
  );
  const realTime = false;
  const openShipmentDetails = (shipment: ShipmentType) => {
    setSelectedShipment(shipment);
  };
  const closeShipmentDetails = () => {
    setSelectedShipment(null);
  };

  // Filter shipments based on search, status, and location
  const filteredShipments = useMemo(() => {
    return shipments.filter((shipment) => {
      const matchesSearch =
        shipment.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        false;
      const matchesStatus =
        filterStatus === "All" || shipment.status === filterStatus;
      const matchesLocation =
        filterLocation === "All" || shipment.location === filterLocation;
      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [shipments, searchQuery, filterStatus, filterLocation]);

  const uniqueLocations = useMemo(() => {
    return ["All", ...new Set(shipments.map((s) => s.location))];
  }, [shipments]);

  return (
    <div className="px-2 md:px-6 py-6 md:py-6 w-full min-h-screen relative">
      <h1 className="text-2xl font-semibold mb-6">Shipments Overview</h1>

      {/* Shipment Stats */}
      <ShipmentStats />

      {/* Search & Filters */}
      <ShipmentFilters
        setSearchQuery={setSearchQuery}
        setFilterLocation={setFilterLocation}
        uniqueLocations={uniqueLocations}
        setFilterStatus={setFilterStatus}
        searchQuery={searchQuery}
      />

      {/* Shipment Table */}
      <ShipmentTable
        filteredShipments={filteredShipments}
        openShipmentDetails={openShipmentDetails}
        realTime={realTime}
      />
      {/* Shipment Details Modal */}
      {selectedShipment && (
        <ShipmentDetailsModal
          selectedShipment={selectedShipment}
          closeShipmentDetails={closeShipmentDetails}
        />
      )}
    </div>
  );
}

export default Shipments;
