import {
  useState,
  useEffect,
  useRef,
  SetStateAction,
  useCallback,
} from "react";
import { motion, useAnimation } from "framer-motion";
import { Truck, PackageCheck, RefreshCw, Ban, Search, X } from "lucide-react";
import shipmentDataRaw from "../data/shipments.json";
import Shipment from "../components/Shipment";
import { ShipmentType } from "../types/ShipmentType";
import getStatusColor from "../utils/StatusColor";

function Shipments() {
  const [shipments, setShipments] = useState<ShipmentType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [selectedShipment, setSelectedShipment] = useState<ShipmentType | null>(
    null
  );
  const shipmentData: ShipmentType[] = shipmentDataRaw as ShipmentType[];
  const controls = useAnimation();
  const tableRef = useRef<HTMLDivElement>(null);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const startAnimation = useCallback(() => {
    controls.start({
      y: ["0%", "-100%"],
      transition: { repeat: Infinity, duration: 40, ease: "linear" },
    });
  }, [controls]);

  useEffect(() => {
    setShipments(shipmentData);
    startAnimation();
  }, [shipmentData, startAnimation]);

  const handleScroll = () => {
    if (timeoutId) clearTimeout(timeoutId);
    controls.stop();
    timeoutId = setTimeout(() => {
      startAnimation();
    }, 3000);
  };

  const openShipmentDetails = (
    shipment: SetStateAction<ShipmentType | null>
  ) => {
    setSelectedShipment(shipment);
    controls.stop(); // Pause animation
  };

  // Close shipment details modal with animation
  const closeShipmentDetails = () => {
    setSelectedShipment(null);
    startAnimation(); // Resume animation
  };

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch = shipment.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || shipment.status === filterStatus;
    const matchesLocation =
      filterLocation === "All" || shipment.location === filterLocation;
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const uniqueLocations = ["All", ...new Set(shipments.map((s) => s.location))];

  return (
    <div className="px-6 py-4 w-full min-h-screen relative">
      <h1 className="text-2xl font-semibold mb-6">Shipments</h1>

      {/* Shipment Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Shipment
          icon={<Truck />}
          label="Total Shipments"
          value={shipments.length}
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

      {/* Infinite Scrolling Shipment Table */}
      <div className="bg-white p-4 rounded-lg shadow overflow-hidden h-[300px] relative">
        <h2 className="text-lg font-semibold mb-4">Recent Shipments</h2>

        <div
          className="overflow-hidden h-[250px]"
          ref={tableRef}
          onScroll={handleScroll}
        >
          <motion.table
            className="w-full text-left border-collapse"
            animate={controls}
          >
            <thead>
              <tr className="border-b">
                <th className="p-3">ID</th>
                <th className="p-3">Order</th>
                <th className="p-3">Status</th>
                <th className="p-3">Location</th>
              </tr>
            </thead>
            <tbody>
              {[...filteredShipments, ...filteredShipments].map(
                (shipment, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100 cursor-pointer"
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
                )
              )}
            </tbody>
          </motion.table>
        </div>
      </div>

      {/* Shipment Details Modal with Animation */}
      {selectedShipment && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/30 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// Status Color Helper

export default Shipments;
