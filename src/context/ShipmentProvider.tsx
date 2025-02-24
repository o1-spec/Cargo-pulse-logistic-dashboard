import React, { useState, useEffect } from "react";
import { ShipmentStatus, ShipmentType } from "../types/ShipmentType";
import toast from "react-hot-toast";
import socket from "../utils/sockets";
import { ShipmentContext } from "./ShipmentContext";

export const ShipmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getStoredShipments = (): ShipmentType[] => {
    try {
      const storedShipments = localStorage.getItem("shipments");
      return storedShipments ? JSON.parse(storedShipments) : [];
    } catch (error) {
      console.error("Error loading shipments:", error);
      return [];
    }
  };

  const [shipments, setShipments] =
    useState<ShipmentType[]>(getStoredShipments);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    localStorage.getItem("notifications") !== "false"
  );
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const saveShipments = (updatedShipments: ShipmentType[]) => {
    localStorage.setItem("shipments", JSON.stringify(updatedShipments));
  };

  const addShipment = (shipment: ShipmentType) => {
    setShipments((prev) => {
      if (prev.some((s) => s.id === shipment.id)) return prev;
      const updatedShipments = [...prev, shipment];
      saveShipments(updatedShipments);
      return updatedShipments;
    });
  };

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

    if (notificationsEnabled) {
      setUnreadNotifications((prev) => prev + 1);
      toast.success(`🚛 Shipment #${id} moved to ${newStatus}`);
    }
  };

  const removeCompletedShipment = (id: string) => {
    setShipments((prev) => {
      const updatedShipments = prev.filter((shipment) => shipment.id !== id);
      saveShipments(updatedShipments);
      return updatedShipments;
    });
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => {
      const newStatus = !prev;
      localStorage.setItem("notifications", newStatus.toString());
      return newStatus;
    });
  };

  useEffect(() => {
    const handleStatusUpdate = (updatedShipment: ShipmentType) => {
      updateShipmentStatus(
        updatedShipment.id,
        updatedShipment.status as ShipmentStatus
      );
    };

    const handleShipmentCompleted = (completedShipment: ShipmentType) => {
      removeCompletedShipment(completedShipment.id);
    };

    socket.on("statusUpdate", handleStatusUpdate);
    socket.on("shipmentCompleted", handleShipmentCompleted);

    return () => {
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
        notificationsEnabled,
        toggleNotifications,
        unreadNotifications,
        setUnreadNotifications,
      }}
    >
      {children}
    </ShipmentContext.Provider>
  );
};
