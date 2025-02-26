import { motion } from "framer-motion";
import { CheckCircle, MapPin, BarChart3 } from "lucide-react";
import { Line, Pie, Bar } from "react-chartjs-2";
import { useShipmentContext } from "../context/useShipmentContext";
import "chart.js/auto";

function ShipmentAnalytics() {
  const { shipments, realTimeShipments } = useShipmentContext();

  const allShipments = [...shipments, ...realTimeShipments];

  const pending = allShipments.filter((s) => s.status === "Pending").length;
  const inTransit = allShipments.filter(
    (s) => s.status === "In Transit"
  ).length;
  const delivered = allShipments.filter((s) => s.status === "Delivered").length;
  const cancelled = allShipments.filter((s) => s.status === "Cancelled").length;

  const shipmentsPerMonth = Array(12).fill(0);
  allShipments.forEach((shipment) => {
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

  const shipmentsByLocation = allShipments.reduce<Record<string, number>>(
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

  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      {/* 📈 Shipment Trends (Live Data) */}
      <motion.div
        className="bg-white dark:bg-[#1a1a1a] p-4 rounded-lg shadow-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <BarChart3
            className="w-5 h-5 text-blue-500"
            role="img"
            aria-label="Shipment Trends Icon"
          />
          Shipment Trends
        </h2>
        <Line
          data={shipmentTrendData}
          data-testid="line-chart"
          role="img"
          aria-label="Shipment Trends Line Chart"
        />
      </motion.div>

      {/* 📊 Status Distribution */}
      <motion.div
        className="bg-white dark:bg-[#1a1a1a] p-4 rounded-lg shadow-md row-span-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <CheckCircle
            className="w-5 h-5 text-green-500"
            role="img"
            aria-label="Status Distribution Icon"
          />
          Status Distribution
        </h2>
        <Pie
          data={statusDistribution}
          data-testid="pie-chart"
          role="img"
          aria-label="Status Distribution Pie Chart"
        />
      </motion.div>

      {/* 🗺️ Shipments Per Location (Live Data) */}
      <motion.div
        className="bg-white dark:bg-[#1a1a1a] p-4 rounded-lg shadow-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
      >
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <MapPin
            className="w-5 h-5 text-yellow-500"
            role="img"
            aria-label="Shipments Per Location Icon"
          />
          Shipments Per Location
        </h2>
        <Bar
          data={locationData}
          data-testid="bar-chart"
          role="img"
          aria-label="Shipments Per Location Bar Chart"
        />
      </motion.div>
    </div>
  );
}

export default ShipmentAnalytics;
