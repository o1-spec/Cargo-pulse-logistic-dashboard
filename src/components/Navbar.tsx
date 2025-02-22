import { useState } from "react";
import { Search, Moon, User, Sun, Bell } from "lucide-react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className=" flex items-center gap-10 py-4 px-8">
      <div className="relative basis-[85%]">
        <Search className="absolute w-5 h-5 top-2 left-3" />
        <input
          type="text"
          placeholder="Search..."
          className="border-[0.6px] border-gray-300 focus:border-[#40c057] focus:ring-1 focus:ring-[#40c057] py-1.5 px-1 pl-10 w-full rounded-md outline-none"
        />
      </div>
      <div className="flex items-center gap-8 basis-[15%]">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-[#40c057]" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
        <Bell className="w-5 h-5 text-[#40c057] cursor-pointer" />
        <User className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  );
}

export default Navbar;
