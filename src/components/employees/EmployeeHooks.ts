import { useLocalStorage } from "../../local-storage/LocalStorageHooks";

export function useEmployeesData() {
  const { data, isLoading } = useLocalStorage<object[]>("employeesData");

  return { data, isLoading };
}