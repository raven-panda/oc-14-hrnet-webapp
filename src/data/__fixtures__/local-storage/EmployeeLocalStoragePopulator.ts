import { employeesFixture } from "../EmployeesFixture.ts";
import type { AvailableLocalStorageKey } from "./LocalStorageService.ts";
import LocalStorageService from "./LocalStorageService.ts";

export default function populateEmployeesLocalStorage() {
  const key: AvailableLocalStorageKey = "employeesData";
  if (!LocalStorageService.isKeyUsedAndDataPresent(key))
    LocalStorageService.setData(key, employeesFixture);
}
