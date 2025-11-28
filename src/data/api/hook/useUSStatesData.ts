import { useEffect, useState } from "react";
import type { USState } from "../definitions/USStates";
import SelectValuesService from "../service/SelectValuesService";

export default function useUSStatesData() {
  const [data, setData] = useState<USState[]>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const usStates = await SelectValuesService.getUsStates();
      setData(usStates);
      setLoading(false);
    };
    fetchData();
    }, []);

  return { data, isLoading };
}