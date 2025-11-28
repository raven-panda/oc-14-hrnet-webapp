import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { environment } from './environment.ts';
import populateEmployeesLocalStorage from './data/__fixtures__/local-storage/EmployeeLocalStoragePopulator.ts';

if (environment.fixtureEnabled && environment.dataMockEnabled) {
  populateEmployeesLocalStorage();
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
