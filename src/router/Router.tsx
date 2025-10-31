import { BrowserRouter, Route, Routes } from "react-router";
import CreateEmployeePage from "../views/CreateEmployeePage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateEmployeePage />} />
      </Routes>
    </BrowserRouter>
  );
}