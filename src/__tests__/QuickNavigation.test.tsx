import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import QuickNavigation from "../components/QuickNavigation";

test("renders QuickNavigation links", () => {
  render(
    <MemoryRouter>
      <QuickNavigation />
    </MemoryRouter>
  );

  expect(screen.getByText(/View Shipments/i)).toBeInTheDocument();
  expect(screen.getByText(/Track Shipments/i)).toBeInTheDocument();
});
