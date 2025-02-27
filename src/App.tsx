import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Loading from "./components/Loading";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Shipments = lazy(() => import("./pages/Shipments"));
const RealTime = lazy(() => import("./pages/RealTime"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      {/* <button className="bg-green-500 font-semibold text-xl rounded-xl py-3 px-4 text-white">
        Start
      </button> */}
      <div className="xl:flex dark:bg-[#1a1a1a]">
        <div ref={sidebarRef} className="basis-[18%] h-full">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
        <div className="basis-[82%]">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="mt-[60px] rounded-t-2xl dark:bg-[#1e1d1d] dark:text-white">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/shipments" element={<Shipments />} />
                <Route path="/real-time" element={<RealTime />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
