import { ShipmentTableTypes } from "../types/ShipmentType";
import { motion } from "framer-motion";

function Shipment({ icon, label, value, bgColor }: ShipmentTableTypes) {
  return (
    <motion.div
      className={`flex items-start md:items-center py-4 md:p-4 px-2 rounded-lg flex-col md:flex-row shadow ${bgColor} text-white`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="py-1 px-2 md:p-2 bg-white/20 rounded-full flex items-center justify-center">
        <span className="flex items-center justify-center">{icon}</span>
      </div>
      <div className="ml-2 md:ml-4">
        <p className="text-lg font-bold">{value}</p>
        <p className="text-sm">{label}</p>
      </div>
    </motion.div>
  );
}

export default Shipment;
