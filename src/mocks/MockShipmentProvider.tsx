import { vi } from "vitest";
import { ReactNode } from "react";
import {
  ShipmentContext,
  ShipmentContextType,
} from "../context/ShipmentContext";
import { mockShipments } from "./mockShipments";

// eslint-disable-next-line react-refresh/only-export-components
export const mockContextValue: ShipmentContextType = {
  shipments: mockShipments,
  addShipment: vi.fn(),
  updateShipmentStatus: vi.fn(),
  removeCompletedShipment: vi.fn(),
  darkMode: false,
  toggleDarkMode: vi.fn(),
  notificationsEnabled: true,
  toggleNotifications: vi.fn(),
  unreadNotifications: 0,
  setUnreadNotifications: vi.fn(),
  notifications: [],
  realTimeShipments: mockShipments,
};

export const MockShipmentProvider = ({ children }: { children: ReactNode }) => (
  <ShipmentContext.Provider value={mockContextValue}>
    {children}
  </ShipmentContext.Provider>
);
