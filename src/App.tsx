import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Shipments = lazy(() => import("./pages/Shipments"));
const RealTime = lazy(() => import("./pages/RealTime"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  return (
    <Router>
      <div className="flex">
        <div className="basis-[18%] h-full">
          <Sidebar />
        </div>
        <div className="basis-[82%]">
          <Navbar />
          <div className="mt-[60px] rounded-t-2xl">
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
