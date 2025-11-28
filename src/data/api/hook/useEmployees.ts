import { useEffect, useState } from "react";
import type { Employee } from "../definitions/Employee.ts";
import EmployeeService from "../service/EmployeeService.ts";

export function useEmployees() {
  const [data, setData] = useState<Employee[]>();
  const [isLoading, setLoading] = useState<boolean>(true);

  const fetchEmployees = async () => {
    setLoading(true);
    const employeesData = await EmployeeService.getAllEmployees();
    setData(employeesData);
    setLoading(false);
  };

  const createEmployee = async (newEmployee: Employee) => {
    setLoading(true);
    await EmployeeService.createEmployee(newEmployee);
    const employeesData = await EmployeeService.getAllEmployees();
    setData(employeesData);
    setLoading(false);
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { data, createEmployee, isLoading };
}
