import { createContext } from "react";
import { ShipmentStatus, ShipmentType } from "../types/ShipmentType";

interface NotificationType {
  id: string;
  message: string;
  status: ShipmentStatus;
}

export interface ShipmentContextType {
  shipments: ShipmentType[];
  realTimeShipments: ShipmentType[];
  addShipment: (shipment: ShipmentType) => void;
  updateShipmentStatus: (id: string, newStatus: ShipmentStatus) => void;
  removeCompletedShipment: (id: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  unreadNotifications: number;
  setUnreadNotifications: (count: number) => void;
  notifications: NotificationType[];
}

export const ShipmentContext = createContext<ShipmentContextType | undefined>(
  undefined
);
