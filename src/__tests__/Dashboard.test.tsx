import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { MockShipmentProvider } from "../mocks/MockShipmentProvider";

test("renders Dashboard components", () => {
  render(
    <MockShipmentProvider>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </MockShipmentProvider>
  );

  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/Total Shipments/i)).toBeInTheDocument();
  expect(screen.getByText(/Recent Shipments/i)).toBeInTheDocument();
});
