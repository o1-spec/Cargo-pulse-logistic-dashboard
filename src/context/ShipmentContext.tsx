import { createContext } from "react";
import { ShipmentStatus, ShipmentType } from "../types/ShipmentType";

export interface ShipmentContextType {
  shipments: ShipmentType[];
  addShipment: (shipment: ShipmentType) => void;
  updateShipmentStatus: (id: string, newStatus: ShipmentStatus) => void;
  removeCompletedShipment: (id: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const ShipmentContext = createContext<ShipmentContextType | undefined>(
  undefined
);
