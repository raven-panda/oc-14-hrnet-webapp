import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import populateEmployeesLocalStorage from "./data/local-storage-populator/EmployeeLocalStoragePopulator.ts";

populateEmployeesLocalStorage();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
