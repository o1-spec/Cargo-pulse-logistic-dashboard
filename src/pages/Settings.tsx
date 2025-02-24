import { useShipmentContext } from "../context/useShipmentContext";

function Settings() {
  const {
    darkMode,
    toggleDarkMode,
    notificationsEnabled,
    toggleNotifications,
  } = useShipmentContext();

  return (
    <div className="p-6 w-full min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Theme</h2>
        <div className="flex items-center justify-between">
          <p className="text-gray-700 dark:text-gray-300">Dark Mode</p>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-md font-semibold ${
              darkMode ? "bg-green-500 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {darkMode ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Notifications</h2>
        <div className="flex items-center justify-between">
          <p className="text-gray-700 dark:text-gray-300">Shipment Updates</p>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={toggleNotifications}
            className="w-6 h-6"
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
