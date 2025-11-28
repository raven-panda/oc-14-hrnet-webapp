import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "../router/Router";

export default function AppMemoryRouter({ route = "/" }: { route?: string }) {
  return (
    <MemoryRouter initialEntries={[route]}>
      <AppRoutes />
    </MemoryRouter>
  );
}