import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import populateEmployeesLocalStorage from "./data/local-storage-populator/EmployeeLocalStoragePopulator.ts";

if (import.meta.env.VITE_ENABLE_FIXTURE === "true" && import.meta.env.VITE_ENABLE_DATA_MOCK === "true") {
  populateEmployeesLocalStorage();
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
