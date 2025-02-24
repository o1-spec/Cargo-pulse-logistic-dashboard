import { useState, useRef, useMemo } from "react";
import {
  Truck,
  PackageCheck,
  RefreshCw,
  Ban,
  Search,
  X,
  Clock,
} from "lucide-react";
import { useShipmentContext } from "../context/useShipmentContext"; // ✅ Fetch shipments from context
import Shipment from "../components/Shipment";
import getStatusColor from "../utils/StatusColor";
import { ShipmentType } from "../types/ShipmentType";

function Shipments() {
  const { shipments } = useShipmentContext(); // ✅ Fetch shipments from context
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [selectedShipment, setSelectedShipment] = useState<ShipmentType | null>(
    null
  );
  const tableRef = useRef<HTMLDivElement>(null);

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
    <div className="px-6 py-4 w-full min-h-screen relative">
      <h1 className="text-2xl font-semibold mb-6">Shipments Overview</h1>

      {/* Shipment Stats */}
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

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="relative">
          <Search className="absolute w-5 h-5 left-3 top-1.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by order name..."
            className="pl-10 pr-4 py-1 border rounded w-[250px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded text-[14px] py-1 text-gray-500"
        >
          <option value="All">All Status</option>
          <option value="Delivered">Delivered</option>
          <option value="In Transit">In Transit</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          onChange={(e) => setFilterLocation(e.target.value)}
          className="border rounded text-gray-500"
        >
          {uniqueLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Shipment Table */}
      <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-lg shadow relative">
        <h2 className="text-lg font-semibold mb-4">Recent Shipments</h2>

        <div className="relative">
          <div
            className="max-h-[250px] overflow-y-auto no-scrollbar"
            ref={tableRef}
          >
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white shadow-md dark:bg-[#1a1a1a]">
                <tr className="border-b">
                  <th className="p-3">ID</th>
                  <th className="p-3">Order</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Location</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="border-b hover:bg-gray-100 cursor-pointer dark:hover:text-[#1a1a1a]"
                    onClick={() => openShipmentDetails(shipment)}
                  >
                    <td className="p-3">{shipment.id}</td>
                    <td className="p-3">{shipment.name}</td>
                    <td
                      className={`p-3 font-semibold ${getStatusColor(
                        shipment.status
                      )}`}
                    >
                      {shipment.status}
                    </td>
                    <td className="p-3">{shipment.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Shipment Details Modal */}
      {selectedShipment && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative">
            <button
              className="absolute top-2 right-2 cursor-pointer"
              onClick={closeShipmentDetails}
            >
              <X className="w-5 h-5 text-gray-500 hover:text-gray-800" />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {selectedShipment.name} Details
            </h2>
            <p>
              <strong>ID:</strong> {selectedShipment.id}
            </p>
            <p>
              <strong>Status:</strong> {selectedShipment.status}
            </p>
            <p>
              <strong>Location:</strong> {selectedShipment.location}
            </p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
              onClick={closeShipmentDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shipments;
