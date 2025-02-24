import { useShipmentContext } from "../context/useShipmentContext";
import {
  Truck,
  CheckCircle,
  RefreshCw,
  XCircle,
  Clock,
  MapPin,
  BarChart3,
  Package,
  X,
} from "lucide-react";
import { Line, Pie, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import "chart.js/auto";
import { Link } from "react-router-dom";
import Shipment from "../components/Shipment";
import getStatusColor from "../utils/StatusColor";
import { useState } from "react";
import { ShipmentType } from "../types/ShipmentType";

function Dashboard() {
  const { shipments } = useShipmentContext();
  const [selectedShipment, setSelectedShipment] = useState<ShipmentType | null>(
    null
  );
  // 🚛 Shipment Statistics
  const totalShipments = shipments.length;
  const pending = shipments.filter((s) => s.status === "Pending").length;
  const inTransit = shipments.filter((s) => s.status === "In Transit").length;
  const delivered = shipments.filter((s) => s.status === "Delivered").length;
  const cancelled = shipments.filter((s) => s.status === "Cancelled").length;

  // 📦 Get the latest 5 shipments
  const recentShipments = shipments.slice(-5).reverse();

  // 📈 **Live Shipment Trends**
  const shipmentsPerMonth = Array(12).fill(0);
  shipments.forEach((shipment) => {
    if (shipment.timestamp) {
      const monthIndex = new Date(shipment.timestamp).getMonth();
      shipmentsPerMonth[monthIndex]++;
    }
  });

  const shipmentTrendData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Shipments Per Month",
        data: shipmentsPerMonth,
        borderColor: "#40c057",
        backgroundColor: "rgba(64,192,87,0.2)",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  // 📊 **Status Distribution**
  const statusDistribution = {
    labels: ["Pending", "In Transit", "Delivered", "Cancelled"],
    datasets: [
      {
        data: [pending, inTransit, delivered, cancelled],
        backgroundColor: ["#6b7280", "#facc15", "#22c55e", "#ef4444"],
        hoverOffset: 8,
      },
    ],
  };

  // 📍 **Live Shipments Per Location**
  const shipmentsByLocation = shipments.reduce<Record<string, number>>(
    (acc, shipment) => {
      acc[shipment.location] = (acc[shipment.location] || 0) + 1;
      return acc;
    },
    {}
  );

  const locationData = {
    labels: Object.keys(shipmentsByLocation),
    datasets: [
      {
        label: "Shipments Per Location",
        data: Object.values(shipmentsByLocation),
        backgroundColor: "#40c057",
        hoverBackgroundColor: "#34a853",
      },
    ],
  };

  const openShipmentDetails = (shipment: ShipmentType) => {
    setSelectedShipment(shipment);
  };

  const closeShipmentDetails = () => {
    setSelectedShipment(null);
  };

  return (
    <div className="p-6 w-full min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* 🚛 Shipment Stats Overview */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <Shipment
          icon={<Truck />}
          label="Total Shipments"
          value={totalShipments}
          bgColor="bg-blue-500"
        />
        <Shipment
          icon={<Clock />}
          label="Pending"
          value={pending}
          bgColor="bg-gray-500"
        />
        <Shipment
          icon={<RefreshCw />}
          label="In Transit"
          value={inTransit}
          bgColor="bg-yellow-500"
        />
        <Shipment
          icon={<CheckCircle />}
          label="Delivered"
          value={delivered}
          bgColor="bg-green-500"
        />
        <Shipment
          icon={<XCircle />}
          label="Cancelled"
          value={cancelled}
          bgColor="bg-red-500"
        />
      </div>

      {/* 📊 Shipment Analytics */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* 📈 Shipment Trends (Live Data) */}
        <motion.div
          className="bg-white dark:bg-[#1a1a1a] p-4 rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" /> Shipment Trends
          </h2>
          <Line data={shipmentTrendData} />
        </motion.div>

        {/* 📊 Status Distribution */}
        <motion.div
          className="bg-white dark:bg-[#1a1a1a] p-4 rounded-lg shadow-md row-span-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" /> Status
            Distribution
          </h2>
          <Pie data={statusDistribution} />
        </motion.div>

        {/* 🗺️ Shipments Per Location (Live Data) */}
        <motion.div
          className="bg-white dark:bg-[#1a1a1a] p-4 rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-yellow-500" /> Shipments Per
            Location
          </h2>
          <Bar data={locationData} />
        </motion.div>
      </div>

      {/* 📦 Recent Shipments */}
      <motion.div
        className="bg-white dark:bg-[#1a1a1a] p-4 rounded-lg shadow-md mb-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-lg font-semibold mb-2">Recent Shipments</h2>
        <div className="overflow-auto max-h-[250px]">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-gray-100 dark:bg-[#2c2c2c]">
              <tr className="border-b">
                <th className="p-3">ID</th>
                <th className="p-3">Order</th>
                <th className="p-3">Status</th>
                <th className="p-3">Location</th>
              </tr>
            </thead>
            <tbody>
              {recentShipments.map((shipment) => (
                <tr
                  key={shipment.id}
                  className="border-b hover:bg-gray-100 dark:hover:bg-[#333] cursor-pointer"
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
      </motion.div>
      {/* Shipment Details Modal */}
      {selectedShipment && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/30 dark:bg-black/30 z-50">
          <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg dark:text-white shadow-lg w-96 text-center relative">
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

      {/* 🔗 Quick Navigation */}
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
    </div>
  );
}

export default Dashboard;
