import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateEmployeePage from "../views/CreateEmployeePage";
import EmployeesListPage from "../views/EmployeesListPage";

export function AppRouter() {
  return (
    <BrowserRouter>
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