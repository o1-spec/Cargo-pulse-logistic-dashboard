import { ReactElement } from "react";

export type ShipmentStatus =
  | "Delivered"
  | "In Transit"
  | "Pending"
  | "Cancelled";

export interface ShipmentType {
  lon: number;
  lat: number;
  timestamp: string | number | Date;
  id: string;
  name: string;
  status: ShipmentStatus;
  location: string;
}

export interface ShipmentTableTypes {
  icon: ReactElement;
  label: string;
  value: number;
  bgColor: string;
}
