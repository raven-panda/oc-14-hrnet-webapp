import { useEffect, useState } from "react";
import { jobDepartmentFixture } from "../../__fixtures__/JobDepartmentFixture";
import type { JobDepartment } from "../definitions/JobDepartment";

export default function useJobDepartmentData() {
  const [data, setData] = useState<JobDepartment[]>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setData(jobDepartmentFixture);
    setLoading(false);
  }, []);

  return { data, isLoading };
}