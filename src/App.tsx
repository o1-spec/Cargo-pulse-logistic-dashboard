import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Shipments = lazy(() => import("./pages/Shipments"));
const RealTime = lazy(() => import("./pages/RealTime"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex">
        <div className="basis-[18%] h-full">
          <Sidebar />
        </div>
        <div className="basis-[82%]">
          <Navbar />
          <div className="mt-[60px] rounded-t-2xl dark:bg-[#1e1d1d] dark:text-white">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
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
