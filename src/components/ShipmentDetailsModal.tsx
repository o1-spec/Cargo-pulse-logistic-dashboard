import { X } from "lucide-react";
import { ShipmentType } from "../types/ShipmentType";

interface Props {
  selectedShipment: ShipmentType;
  closeShipmentDetails: () => void;
}

const ShipmentDetailsModal = ({
  selectedShipment,
  closeShipmentDetails,
}: Props) => {
  return (
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
  );
};

export default ShipmentDetailsModal;
