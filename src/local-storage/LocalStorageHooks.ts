import { useEffect, useState } from "react";

type AvaiableLocalStorageKey =
| "employeesData";

export function useLocalStorage<TData>(key: AvaiableLocalStorageKey) {
  const [data, setData] = useState<TData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const rawData = localStorage.getItem(key);
    const parsedData: TData = rawData ? JSON.parse(rawData) : undefined;

    setData(parsedData);
    setIsLoading(false);
  }, [key]);

  return { data, isLoading }
}