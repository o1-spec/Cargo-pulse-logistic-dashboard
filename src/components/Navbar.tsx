import { Moon, Sun, Bell, Truck, Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useShipmentContext } from "../context/useShipmentContext";

interface NavbarInterface {
  toggleSidebar: () => void;
}

function Navbar({ toggleSidebar }: NavbarInterface) {
  const {
    darkMode,
    toggleDarkMode,
    unreadNotifications,
    setUnreadNotifications,
    notifications,
  } = useShipmentContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const toggleNotificationBox = () => {
    setShowNotifications((prev) => !prev);
    setUnreadNotifications(0);
  };

  // Close the notification box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-gray-500";
      case "In Transit":
        return "bg-yellow-500";
      case "Delivered":
        return "bg-green-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="flex items-center md:gap-10 gap-4 py-4 sm:py-5 px-2 md:px-8 bg-[#f7f7f7] dark:bg-[#1a1a1a] fixed top-0 left-0 right-0 xl:pl-64 z-50">
      <div className="relative basis-[85%] flex items-center gap-1 sm:gap-4">
        <button onClick={toggleSidebar} className="xl:hidden cursor-pointer">
          <Menu className="w-6 h-6 dark:text-white" />
        </button>
        <h3 className="font-semibold text-green-500 text-[22px] sm:text-2xl">
          Dashboard Overview
        </h3>
      </div>

      <div className="flex items-center gap-2 md:gap-8 basis-[15%] pr-1.5">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full border cursor-pointer"
        >
          {darkMode ? (
            <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
          ) : (
            <Moon className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          )}
        </button>

        <div className="relative" ref={notificationRef}>
          <div
            onClick={toggleNotificationBox}
            className="cursor-pointer relative"
          >
            <Bell className="w-5 h-5 text-[#40c057]" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {unreadNotifications}
              </span>
            )}
          </div>

          {showNotifications && (
            <div className="absolute right-0 mt-2 py-5 w-64 bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-lg max-h-80 overflow-auto no-scrollbar">
              {notifications.length === 0 ? (
                <p className="p-3 text-gray-500">No notifications</p>
              ) : (
                notifications.map((notif, index) => (
                  <div
                    key={index}
                    className={`p-3 my-2 mx-3 rounded-md text-white ${getStatusColor(
                      notif.status
                    )}`}
                  >
                    {notif.message}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <Truck className="w-8 h-8 hidden md:flex rounded-full text-white bg-[#40c057] px-1.5" />
      </div>
    </div>
  );
}

export default Navbar;
