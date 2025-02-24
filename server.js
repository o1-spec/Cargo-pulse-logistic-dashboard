import { Server } from "socket.io";

const io = new Server(5000, {
  cors: { origin: "*" },
});

console.log("🚀 WebSocket server running on port 5000");

// Shipment statuses
const statuses = ["Pending", "In Transit", "Delivered", "Completed"];

// Locations with coordinates
const locations = [
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "Lagos", lat: 6.5244, lon: 3.3792 },
  { name: "China", lat: 35.8617, lon: 104.1954 },
  { name: "Kano", lat: 12.0022, lon: 8.5919 },
  { name: "Borno", lat: 11.8333, lon: 13.15 },
  { name: "Kebbi", lat: 12.45, lon: 4.1998 },
  { name: "Imo", lat: 5.485, lon: 7.0355 },
  { name: "Onitsha", lat: 6.1499, lon: 6.7857 },
  { name: "Ibadan", lat: 7.3776, lon: 3.947 },
];

let activeShipments = [];

// Function to generate a new shipment
function generateNewShipment() {
  const randomLocation =
    locations[Math.floor(Math.random() * locations.length)];
  const newShipment = {
    id: Math.floor(1000 + Math.random() * 9000).toString(), // Ensure 4-digit ID
    name: `Order #${Math.floor(1000 + Math.random() * 9000)}`, // Order #1000 - 9999
    status: "Pending",
    location: randomLocation.name,
    lat: randomLocation.lat,
    lon: randomLocation.lon,
    timestamp: new Date().toISOString(),
  };

  if (activeShipments.length >= 10) {
    activeShipments.shift(); // Remove oldest shipment if >10
  }
  activeShipments.push(newShipment);

  io.emit("shipmentUpdate", newShipment);
  console.log(
    `📦 New Shipment: ${newShipment.name} at ${newShipment.location}`
  );
}

// Function to update shipment statuses
function updateShipmentStatus() {
  activeShipments = activeShipments
    .map((shipment) => {
      if (shipment.status === "Pending") {
        shipment.status = "In Transit";
      } else if (shipment.status === "In Transit") {
        shipment.status = "Delivered";
      } else if (shipment.status === "Delivered") {
        shipment.status = "Completed";
        io.emit("shipmentCompleted", shipment); // Notify clients of completion
        console.log(`✅ Shipment Completed: ${shipment.name}`);
        return null; // Mark for removal
      }

      io.emit("statusUpdate", shipment);
      console.log(`🚛 Status Update: ${shipment.name} → ${shipment.status}`);
      return shipment;
    })
    .filter(Boolean); // Remove completed shipments
}

// Send a new shipment every 2 minutes
setInterval(generateNewShipment, 120000);

// Update shipment statuses every 5 minutes
setInterval(updateShipmentStatus, 300000);

// WebSocket connection handler
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  // Send existing shipments immediately
  if (activeShipments.length > 0) {
    socket.emit("shipmentUpdate", activeShipments);
  } else {
    // If no shipments exist, generate one immediately
    generateNewShipment();
  }

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});
