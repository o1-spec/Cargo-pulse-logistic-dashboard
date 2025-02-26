import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ShipmentAnalytics from "../components/ShipmentAnalytics";
import { MockShipmentProvider } from "../mocks/MockShipmentProvider";

test("renders ShipmentAnalytics charts", () => {
  render(
    <MockShipmentProvider>
      <MemoryRouter>
        <ShipmentAnalytics />
      </MemoryRouter>
    </MockShipmentProvider>
  );

  expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
  expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
});
