import { useContext } from "react";
import { ShipmentContext } from "./ShipmentContext";

export const useShipmentContext = () => {
  const context = useContext(ShipmentContext);
  if (!context) {
    throw new Error(
      "useShipmentContext must be used within a ShipmentProvider"
    );
  }
  return context;
};
