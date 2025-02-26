import { ShipmentType } from "../types/ShipmentType";

export const mockShipments: ShipmentType[] = [
  {
    id: "1",
    name: "Order #1234",
    status: "Pending",
    location: "New York",
    timestamp: new Date().toISOString(),
    lon: -74.006,
    lat: 40.7128,
  },
  {
    id: "2",
    name: "Order #5678",
    status: "Delivered",
    location: "Lagos",
    timestamp: new Date().toISOString(),
    lon: 3.3792,
    lat: 6.5244,
  },
  {
    id: "3",
    name: "Order #9101",
    status: "Cancelled",
    location: "London",
    timestamp: new Date().toISOString(),
    lon: -0.1276,
    lat: 51.5074,
  },
  {
    id: "4",
    name: "Order #1122",
    status: "In Transit",
    location: "Berlin",
    timestamp: new Date().toISOString(),
    lon: 13.405,
    lat: 52.52,
  },
];
