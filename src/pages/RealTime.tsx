import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Truck, RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react";
import Shipment from "../components/Shipment";
import { useShipmentContext } from "../context/useShipmentContext";
import { ShipmentType } from "../types/ShipmentType";
import L from "leaflet";
import toast from "react-hot-toast";
import socket from "../utils/sockets";

// Custom marker icon for shipments
const shipmentIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Status colors
const statusColors: Record<
  "Delivered" | "In Transit" | "Pending" | "Cancelled",
  string
> = {
  Delivered: "bg-green-100 text-green-700",
  "In Transit": "bg-yellow-100 text-yellow-700",
  Pending: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

function RealTime() {
  const { shipments, updateShipmentStatus, removeCompletedShipment } =
    useShipmentContext(); // ✅ Context API
  const [selectedShipment, setSelectedShipment] = useState<ShipmentType | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  useEffect(() => {
    const handleStatusUpdate = (updatedShipment: ShipmentType) => {
      toast.success(
        `🚛 ${updatedShipment.name} is now ${updatedShipment.status}`
      );
      updateShipmentStatus(updatedShipment.id, updatedShipment.status);
    };

    const handleShipmentCompleted = (completedShipment: ShipmentType) => {
      toast.success(`✅ ${completedShipment.name} has been completed`);
      removeCompletedShipment(completedShipment.id);
    };

    // Listen for shipment updates
    socket.on("statusUpdate", handleStatusUpdate);
    socket.on("shipmentCompleted", handleShipmentCompleted);

    return () => {
      socket.off("statusUpdate", handleStatusUpdate);
      socket.off("shipmentCompleted", handleShipmentCompleted);
    };
  }, [updateShipmentStatus, removeCompletedShipment]);

  // Filter shipments based on status selection
  const filteredShipments =
    selectedStatus === "All"
      ? shipments
      : shipments.filter((s) => s.status === selectedStatus);

  return (
    <div className="p-6 w-full min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Real-Time Updates</h1>

      {/* Status Filters */}
      <div className="flex gap-4 mb-6">
        {Object.keys(statusColors).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              statusColors[status as keyof typeof statusColors]
            } hover:opacity-80 transition cursor-pointer`}
          >
            {status}
          </button>
        ))}
        <button
          onClick={() => setSelectedStatus("All")}
          className="px-4 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition cursor-pointer"
        >
          Show All
        </button>
      </div>

      {/* Summary Cards */}
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
          icon={<CheckCircle />}
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
          icon={<XCircle />}
          label="Cancelled"
          value={shipments.filter((s) => s.status === "Cancelled").length}
          bgColor="bg-red-500"
        />
      </div>

      {/* Real-Time Table */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
        <h2 className="text-lg font-semibold mb-4">Live Shipment Updates</h2>

        <div className="relative">
          <div className="max-h-[400px] overflow-y-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white shadow-md">
                <tr className="border-b bg-gray-50">
                  <th className="p-3">ID</th>
                  <th className="p-3">Order</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedShipment(shipment)}
                  >
                    <td className="p-3">{shipment.id}</td>
                    <td className="p-3">{shipment.name}</td>
                    <td
                      className={`p-3 font-semibold rounded ${
                        statusColors[shipment.status]
                      }`}
                    >
                      {shipment.status}
                    </td>
                    <td className="p-3">{shipment.location}</td>
                    <td className="p-3 text-gray-500 text-sm">
                      {shipment.timestamp
                        ? new Date(shipment.timestamp).toLocaleTimeString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Shipment Details Modal */}
      {selectedShipment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[80vw] h-[60vh] flex">
            {/* Map Section (80%) */}
            <div className="w-[80%]">
              <MapContainer
                center={[selectedShipment.lat, selectedShipment.lon]}
                zoom={6}
                className="h-full w-full"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[selectedShipment.lat, selectedShipment.lon]}
                  icon={shipmentIcon}
                >
                  <Popup>{selectedShipment.name}</Popup>
                </Marker>
              </MapContainer>
            </div>

            {/* Details Section (20%) */}
            <div className="w-[20%] p-4 bg-gray-100 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold">
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
              </div>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => setSelectedShipment(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RealTime;
