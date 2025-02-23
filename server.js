import { Server } from "socket.io";

const io = new Server(5000, {
  cors: { origin: "*" },
});

console.log("WebSocket server running on port 5000");

const statuses = ["Pending", "In Transit", "Delivered", "Completed"];
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

function generateNewShipment() {
  const randomLocation =
    locations[Math.floor(Math.random() * locations.length)];
  const newShipment = {
    id: Math.floor(Math.random() * 1000).toString(),
    name: `Order #${Math.floor(Math.random() * 9999)}`,
    status: "Pending",
    location: randomLocation.name,
    lat: randomLocation.lat,
    lon: randomLocation.lon,
    timestamp: new Date().toISOString(),
  };

  if (activeShipments.length >= 10) {
    activeShipments.shift();
  }
  activeShipments.push(newShipment);

  return newShipment;
}

function updateShipmentStatus() {
  activeShipments.forEach((shipment, index) => {
    const prevStatus = shipment.status;

    if (shipment.status === "Pending") {
      shipment.status = "In Transit";
    } else if (shipment.status === "In Transit") {
      shipment.status = "Delivered";
    } else if (shipment.status === "Delivered") {
      shipment.status = "Completed";
      io.emit("shipmentCompleted", shipment);
      activeShipments.splice(index, 1);
      return;
    }

    if (prevStatus !== shipment.status) {
      io.emit("statusUpdate", shipment);
    }
  });

  io.emit("shipmentUpdate", activeShipments);
}

// Send a new shipment every 2 minutes
setInterval(() => {
  const newShipment = generateNewShipment();
  io.emit("shipmentUpdate", activeShipments);
}, 120000);

// Update shipment statuses every 5 minutes
setInterval(() => {
  updateShipmentStatus();
}, 300000);

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.emit("shipmentUpdate", activeShipments);
});
