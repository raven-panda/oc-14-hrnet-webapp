import type { AvailableLocalStorageKey } from "../../local-storage/LocalStorageHooks.ts";
import { employeesFixture } from "../__fixtures__/EmployeesFixture.ts";

export default function populateEmployeesLocalStorage() {
  const key: AvailableLocalStorageKey = "employeesData";
  if (!localStorage.getItem(key))
    localStorage.setItem(key, JSON.stringify(employeesFixture));
}
