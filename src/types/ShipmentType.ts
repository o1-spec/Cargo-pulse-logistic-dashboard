import { ReactElement } from "react";

export interface ShipmentType {
  lon: number;
  lat: number;
  timestamp: string | number | Date;
  id: string;
  name: string;
  status: "Delivered" | "In Transit" | "Pending" | "Cancelled";
  location: string;
}

export interface ShipmentTableTypes {
  icon: ReactElement;
  label: string;
  value: number;
  bgColor: string;
}
