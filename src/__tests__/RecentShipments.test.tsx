import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecentShipments from "../components/RecentShipments";
import { MockShipmentProvider } from "../mocks/MockShipmentProvider";
import { vi } from "vitest";

test("clicking a recent shipment triggers openShipmentDetails", () => {
  const mockOpenShipmentDetails = vi.fn();

  render(
    <MockShipmentProvider>
      <MemoryRouter>
        <RecentShipments openShipmentDetails={mockOpenShipmentDetails} />
      </MemoryRouter>
    </MockShipmentProvider>
  );

  const shipmentRow = screen.getAllByRole("row")[1];
  fireEvent.click(shipmentRow);

  expect(mockOpenShipmentDetails).toHaveBeenCalled();
});
