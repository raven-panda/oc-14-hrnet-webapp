import { render } from "@testing-library/react";
import AppMemoryRouter from "./AppMemoryRouter.tsx";
import App from "../App.tsx";

export function renderWithRouter(route: string = "/") {
  return (
    render(
      <App router={<AppMemoryRouter route={route} />} />
    )
  );
}