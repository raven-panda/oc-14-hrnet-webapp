import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateEmployeePage from "../views/CreateEmployeePage";
import EmployeesListPage from "../views/EmployeesListPage";

const rawBase = import.meta.env.VITE_BASE || '/';
const basename = rawBase === '/' ? '/' : rawBase.replace(/(^\/|\/$)/g, '');

export function AppRouter() {
  return (
    <BrowserRouter basename={basename === '/' ? '/' : `/${basename}`}>
      <AppRoutes />
    </BrowserRouter>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CreateEmployeePage />} />
      <Route path="/employee-list" element={<EmployeesListPage />} />
    </Routes>
  );
}