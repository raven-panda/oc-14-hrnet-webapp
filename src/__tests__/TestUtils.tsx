import { render } from "@testing-library/react";
import AppMemoryRouter from "./AppMemoryRouter.tsx";

export function renderWithRouter(route: string = "/") {
  return (
    render(
      <AppMemoryRouter route={route} />
    )
  );
}