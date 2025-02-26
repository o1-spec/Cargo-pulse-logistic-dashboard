import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MockShipmentProvider } from "../mocks/MockShipmentProvider";
import Dashboard from "../pages/Dashboard";
import { axe } from "vitest-axe";

test("Dashboard should have no accessibility violations", async () => {
  const { container } = render(
    <MockShipmentProvider>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </MockShipmentProvider>
  );

  await waitFor(async () => {
    const results = await axe(container);
    console.log("Accessibility Violations:", results.violations);
    expect(results.violations).toHaveLength(0);
  });
});
