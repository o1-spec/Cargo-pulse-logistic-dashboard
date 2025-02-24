import React, { useState, useEffect } from "react";
import { ShipmentStatus, ShipmentType } from "../types/ShipmentType";
import toast from "react-hot-toast";
import socket from "../utils/sockets";
import { ShipmentContext } from "./ShipmentContext";

export const ShipmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Load persisted shipments from local storage
  const getStoredShipments = (): ShipmentType[] => {
    try {
      const storedShipments = localStorage.getItem("shipments");
      return storedShipments ? JSON.parse(storedShipments) : [];
    } catch (error) {
      console.error("Error loading shipments from localStorage:", error);
      return [];
    }
  };

  const [shipments, setShipments] =
    useState<ShipmentType[]>(getStoredShipments);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Function to persist shipments
  const saveShipments = (updatedShipments: ShipmentType[]) => {
    localStorage.setItem("shipments", JSON.stringify(updatedShipments));
  };

  // Add a new shipment & prevent duplicates
  const addShipment = (shipment: ShipmentType) => {
    setShipments((prev) => {
      const existingShipment = prev.find((s) => s.id === shipment.id);
      if (existingShipment) return prev; // Prevent duplicates

      const updatedShipments = [...prev, shipment];
      saveShipments(updatedShipments);
      return updatedShipments;
    });
    console.log("🚛 New Shipment Added:", shipment);
  };

  // Update shipment status & persist data
  const updateShipmentStatus = (id: string, newStatus: ShipmentStatus) => {
    setShipments((prev) => {
      const updatedShipments = prev.map((shipment) =>
        shipment.id === id
          ? {
              ...shipment,
              status: newStatus,
              timestamp: new Date().toISOString(),
            }
          : shipment
      );
      saveShipments(updatedShipments);
      return updatedShipments;
    });
  };

  // Remove completed shipments & persist data
  const removeCompletedShipment = (id: string) => {
    setShipments((prev) => {
      const updatedShipments = prev.filter((shipment) => shipment.id !== id);
      saveShipments(updatedShipments);
      return updatedShipments;
    });
  };

  // Toggle dark mode & persist preference
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  // WebSocket event listeners
  useEffect(() => {
    const handleShipmentUpdate = (newShipment: ShipmentType) => {
      if (!newShipment || !newShipment.id) return;
      console.log("📦 Shipment Received:", newShipment);
      addShipment(newShipment);
    };

    const handleStatusUpdate = (updatedShipment: ShipmentType) => {
      if (!updatedShipment || !updatedShipment.id) return;
      toast.success(
        `🚛 ${updatedShipment.name} is now ${updatedShipment.status}`
      );
      updateShipmentStatus(
        updatedShipment.id,
        updatedShipment.status as ShipmentStatus
      );
    };

    const handleShipmentCompleted = (completedShipment: ShipmentType) => {
      if (!completedShipment || !completedShipment.id) return;
      toast.success(`✅ ${completedShipment.name} has been completed`);
      removeCompletedShipment(completedShipment.id);
    };

    // Register WebSocket listeners
    socket.on("shipmentUpdate", handleShipmentUpdate);
    socket.on("statusUpdate", handleStatusUpdate);
    socket.on("shipmentCompleted", handleShipmentCompleted);

    // Cleanup WebSocket listeners on component unmount
    return () => {
      socket.off("shipmentUpdate", handleShipmentUpdate);
      socket.off("statusUpdate", handleStatusUpdate);
      socket.off("shipmentCompleted", handleShipmentCompleted);
    };
  }, []);

  return (
    <ShipmentContext.Provider
      value={{
        shipments,
        addShipment,
        updateShipmentStatus,
        removeCompletedShipment,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ShipmentContext.Provider>
  );
};
