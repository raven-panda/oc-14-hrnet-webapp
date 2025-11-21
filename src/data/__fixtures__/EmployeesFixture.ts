import type { Employee } from "../api/definitions/Employee.ts";
import EmployeeGenerator from "./data-generator/EmployeeGenerator.ts";

export const employeesFixture: Employee[] = EmployeeGenerator.generateRandomEmployeesData(50);
