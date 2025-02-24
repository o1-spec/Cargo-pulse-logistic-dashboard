import { Search, Moon, User, Sun, Bell } from "lucide-react";
import { useShipmentContext } from "../context/useShipmentContext";

function Navbar() {
  const { darkMode, toggleDarkMode } = useShipmentContext();

  return (
    <div className="flex items-center gap-10 py-4 px-8 bg-[#f7f7f7] dark:bg-[#1a1a1a] fixed top-0 left-[17%] right-0 z-50">
      {/* Search Input */}
      <div className="relative basis-[85%]">
        <Search className="absolute w-5 h-5 top-2 left-3 text-gray-600 dark:text-gray-300" />
        <input
          type="text"
          placeholder="Search..."
          className="border-[0.6px] border-gray-300 dark:border-gray-600 focus:border-[#40c057] focus:ring-1 focus:ring-[#40c057] py-1.5 px-1 pl-10 w-full rounded-md outline-none bg-white dark:bg-[#2c2c2c] text-gray-800 dark:text-white"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-8 basis-[15%]">
        {/* ✅ Toggle Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" /> // 🌞 Show Sun in Dark Mode
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" /> // 🌙 Show Moon in Light Mode
          )}
        </button>

        <Bell className="w-5 h-5 text-[#40c057] cursor-pointer" />
        <User className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer" />
      </div>
    </div>
  );
}

export default Navbar;
