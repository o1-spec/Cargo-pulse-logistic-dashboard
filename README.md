# 📦 Logistics Dashboard

A real-time logistics dashboard built with **React**, **WebSockets**, allowing companies to track shipments dynamically.

## 🚀 Features

- **Initial shipments:** It initially has 10 shipments in a json file
- **Live Shipment Tracking:** New shipments are added every **2 minutes**.
- **Automated Status Updates:** Shipment status changes every **5 minutes**.
- **Dark Mode & Light Mode:** Users can toggle themes for better visibility.
- **Real-Time Notifications:** Status change alerts are available in the **Settings**.
- **Interactive Charts:** The Dashboard displays shipment analytics visually.
- **Infinite Scrolling Shipments Table:** Scroll through all shipments seamlessly.
- **Live Map Integration:** View shipment locations dynamically.

## 🛠️ Installation & Setup

Follow these steps to set up and run the project locally:

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-repo/logistics-dashboard.git
cd logistics-dashboard
npm install
node server.js
npm run dev
```

## 📊 How the Site Works

### **🖥 Dashboard Page**

- Displays **shipment statistics** with interactive **charts**.
- Users can analyze data for **delivered, in-transit, and pending shipments**.
- Provides a quick overview of logistics performance.

### **🚚 Shipments Page**

- Shows a list of all shipments with **infinite scrolling**.
- Users can **search and filter** shipments by status and location.
- Clicking on a shipment opens a **detailed view** with tracking information.
- **Status colors** help quickly identify shipment progress.

### **🔴 Real-Time Updates Page**

- **New shipments** are added automatically **every 2 minutes**.
- **Shipment statuses** change dynamically **every 5 minutes**.
- Clicking a shipment opens a **modal** with:
  - 📍 **Live Map (80%)** showing shipment location.
  - 📄 **Details Panel (20%)** with real-time updates.
- **WebSocket Integration** ensures continuous updates without refreshing.

### **🌗 Dark Mode & Light Mode**

- Users can toggle between **dark** and **light** mode for better accessibility.
- Found in the **Settings** page.

### **🔔 Notifications**

- Alerts users when a shipment's status changes.
- Notifications appear in the **Settings** section.

### **🗺️ Live Map Integration**

- The real-time updates modal displays a **live map**.
- Shipments are tracked with their latest locations.
- Ensures visibility for ongoing deliveries.

### **⚙️ Settings Page**

- Toggle **Dark Mode / Light Mode**.
- View **Notifications** for real-time shipment updates.

---

## 🧪 Running Tests

To run the test suite which were implemented with vitest, use the following command:

```sh
npm test
```

This logistics dashboard provides an **intuitive, real-time tracking experience** with **automated updates, interactive charts, and a seamless user interface**. 🚛📦
