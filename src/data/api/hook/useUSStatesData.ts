import { useEffect, useState } from "react";
import { statesSelectDataFixtures } from "../../__fixtures__/StatesSelectDataFixtures";
import type { USState } from "../definitions/USStates";

export default function useUSStatesData() {
  const [data, setData] = useState<USState[]>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setData(statesSelectDataFixtures);
    setLoading(false);
  }, []);

  return { data, isLoading };
}