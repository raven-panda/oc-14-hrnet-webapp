import { BrowserRouter, Route, Routes } from "react-router";
import CreateEmployeePage from "../views/CreateEmployeePage";
import EmployeesListPage from "../views/EmployeesListPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateEmployeePage />} />
        <Route path="/employee-list" element={<EmployeesListPage />} />
      </Routes>
    </BrowserRouter>
  );
}