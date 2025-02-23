import { ShipmentTableTypes } from "../types/ShipmentType";
import { motion } from "framer-motion";

function Shipment({ icon, label, value, bgColor }: ShipmentTableTypes) {
  return (
    <motion.div
      className={`flex items-center p-4 rounded-lg shadow ${bgColor} text-white`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-2 bg-white/20 rounded-full">{icon}</div>
      <div className="ml-4">
        <p className="text-lg font-bold">{value}</p>
        <p className="text-sm">{label}</p>
      </div>
    </motion.div>
  );
}

export default Shipment;
