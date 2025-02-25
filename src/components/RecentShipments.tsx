import { motion } from "framer-motion";
import getStatusColor from "../utils/StatusColor";
import { ShipmentType } from "../types/ShipmentType";
import { useShipmentContext } from "../context/useShipmentContext";

interface RecentShipmentsTypes {
  openShipmentDetails: (shipment: ShipmentType) => void;
}

function RecentShipments({ openShipmentDetails }: RecentShipmentsTypes) {
  const { shipments } = useShipmentContext();

  const recentShipments = shipments.slice(-5).reverse();

  return (
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
  );
}

export default RecentShipments;
