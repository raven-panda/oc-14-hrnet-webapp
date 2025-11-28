import { useEffect, useState } from "react";
import type { JobDepartment } from "../definitions/JobDepartment";
import SelectValuesService from "../service/SelectValuesService";

export default function useJobDepartmentData() {
  const [data, setData] = useState<JobDepartment[]>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const jobDepartments = await SelectValuesService.getJobDepartments();
      setData(jobDepartments);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { data, isLoading };
}