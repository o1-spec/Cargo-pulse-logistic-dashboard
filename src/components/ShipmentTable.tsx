import { useRef } from "react";
import { ShipmentType } from "../types/ShipmentType";
import getStatusColor from "../utils/StatusColor";

interface Props {
  filteredShipments: ShipmentType[];
  openShipmentDetails: (shipment: ShipmentType) => void;
  realTime: boolean;
}

const ShipmentTable = ({
  filteredShipments,
  openShipmentDetails,
  realTime,
}: Props) => {
  const tableRef = useRef<HTMLDivElement>(null);

  return (
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
                  {realTime && (
                    <td className="p-3 text-gray-500 text-sm">
                      {shipment.timestamp
                        ? new Date(shipment.timestamp).toLocaleTimeString()
                        : "N/A"}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTable;
