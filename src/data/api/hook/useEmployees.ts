import { useLocalStorage } from "../../../local-storage/LocalStorageHooks.ts";
import type { Employee } from "../definitions/Employee.ts";

export function useEmployees() {
  const { data, updateData, isLoading } = useLocalStorage<Employee[]>('employeesData');

  const createEmployee = (newEmployee: Employee) => {
    updateData([
      ...(data ?? []),
      newEmployee
    ])
  }

  return { data, createEmployee, isLoading };
}
