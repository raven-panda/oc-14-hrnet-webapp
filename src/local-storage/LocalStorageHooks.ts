import { useCallback, useEffect, useState } from "react";

export type AvailableLocalStorageKey =
| "employeesData";

export function useLocalStorage<TData>(key: AvailableLocalStorageKey) {
  const [data, setData] = useState<TData>();
  const [isLoading, setIsLoading] = useState(true);

  const updateData = (data: TData) => {
    localStorage.setItem(key, JSON.stringify(data));
    setIsLoading(true);
    retrieveData();
  }

  const retrieveData = useCallback(() => {
    const rawData = localStorage.getItem(key);
    const parsedData: TData = rawData ? JSON.parse(rawData) : undefined;

    setData(parsedData);
    setIsLoading(false);
  }, [key])

  useEffect(() => {
    retrieveData();
  }, [retrieveData]);

  return { data, updateData, isLoading }
}
