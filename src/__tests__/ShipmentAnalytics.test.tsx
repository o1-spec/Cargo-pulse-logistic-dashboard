import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ShipmentAnalytics from "../components/ShipmentAnalytics";
import { MockShipmentProvider } from "../mocks/MockShipmentProvider";
import { vi } from "vitest";

vi.mock("react-chartjs-2", () => ({
  Line: () => <canvas data-testid="line-chart" />,
  Pie: () => <canvas data-testid="pie-chart" />,
  Bar: () => <canvas data-testid="bar-chart" />,
}));

test("renders ShipmentAnalytics charts", async () => {
  render(
    <MockShipmentProvider>
      <MemoryRouter>
        <ShipmentAnalytics />
      </MemoryRouter>
    </MockShipmentProvider>
  );

  // Wait for charts to render
  await waitFor(() => {
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });
});
