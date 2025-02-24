import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ShipmentProvider } from "./context/ShipmentProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ShipmentProvider>
      <App />
    </ShipmentProvider>
  </StrictMode>
);
