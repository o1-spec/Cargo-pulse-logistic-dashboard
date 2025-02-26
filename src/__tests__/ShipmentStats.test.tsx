import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ShipmentStats from "../components/ShipmentStats";
import { MockShipmentProvider } from "../mocks/MockShipmentProvider";

test("renders correct shipment stats", () => {
  render(
    <MockShipmentProvider>
      <MemoryRouter>
        <ShipmentStats />
      </MemoryRouter>
    </MockShipmentProvider>
  );

  expect(screen.getByText(/Total Shipments/i)).toBeInTheDocument();
  expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  expect(screen.getByText(/Delivered/i)).toBeInTheDocument();
});
