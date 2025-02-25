import React, { useState, useEffect, useCallback } from "react";
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
      console.error("Error loading shipments from localStorage:", error);
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
  const [unreadNotifications, setUnreadNotifications] = useState(
    Number(localStorage.getItem("unreadNotifications")) || 0
  );
  const [notifications, setNotifications] = useState<
    { id: string; message: string; status: ShipmentStatus }[]
  >(() => {
    try {
      const storedNotifications = localStorage.getItem("notificationsList");
      return storedNotifications ? JSON.parse(storedNotifications) : [];
    } catch (error) {
      console.error("Error loading notifications from localStorage:", error);
      return [];
    }
  });

  const saveShipments = (updatedShipments: ShipmentType[]) => {
    localStorage.setItem("shipments", JSON.stringify(updatedShipments));
  };

  const saveNotifications = (
    updatedNotifications: {
      id: string;
      message: string;
      status: ShipmentStatus;
    }[]
  ) => {
    localStorage.setItem(
      "notificationsList",
      JSON.stringify(updatedNotifications)
    );
  };

  const saveUnreadNotifications = (count: number) => {
    localStorage.setItem("unreadNotifications", count.toString());
  };

  const addShipment = useCallback((shipment: ShipmentType) => {
    setShipments((prev) => {
      if (prev.some((s) => s.id === shipment.id)) return prev;
      const updatedShipments = [...prev, shipment];
      saveShipments(updatedShipments);
      return updatedShipments;
    });
  }, []);

  const updateShipmentStatus = useCallback(
    (id: string, newStatus: ShipmentStatus) => {
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
        const newNotification = {
          id,
          message: `🚛 Shipment #${id} moved to ${newStatus}`,
          status: newStatus,
        };

        setUnreadNotifications((prev) => {
          const updatedCount = prev + 1;
          saveUnreadNotifications(updatedCount);
          return updatedCount;
        });

        setNotifications((prev) => {
          const updatedNotifications = [newNotification, ...prev];
          saveNotifications(updatedNotifications);
          return updatedNotifications;
        });

        toast.success(newNotification.message);
      }
    },
    [notificationsEnabled]
  );

  const removeCompletedShipment = useCallback((id: string) => {
    setShipments((prev) => prev.filter((shipment) => shipment.id !== id));
  }, []);

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
    const handleShipmentUpdate = (newShipment: ShipmentType) => {
      if (!newShipment || !newShipment.id) return;
      addShipment(newShipment);
    };

    const handleStatusUpdate = (updatedShipment: ShipmentType) => {
      if (!updatedShipment || !updatedShipment.id) return;
      updateShipmentStatus(
        updatedShipment.id,
        updatedShipment.status as ShipmentStatus
      );
    };

    const handleShipmentCompleted = (completedShipment: ShipmentType) => {
      removeCompletedShipment(completedShipment.id);
    };

    socket.on("shipmentUpdate", handleShipmentUpdate);
    socket.on("statusUpdate", handleStatusUpdate);
    socket.on("shipmentCompleted", handleShipmentCompleted);

    return () => {
      socket.off("shipmentUpdate", handleShipmentUpdate);
      socket.off("statusUpdate", handleStatusUpdate);
      socket.off("shipmentCompleted", handleShipmentCompleted);
    };
  }, [addShipment, updateShipmentStatus, removeCompletedShipment]);

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
        notifications,
      }}
    >
      {children}
    </ShipmentContext.Provider>
  );
};
