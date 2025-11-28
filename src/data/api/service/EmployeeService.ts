import { environment } from "../../../environment";
import LocalStorageService from "../../__fixtures__/local-storage/LocalStorageService";
import type { Employee } from "../definitions/Employee";

export default class EmployeeService {
  public static async getAllEmployees(): Promise<Employee[]> {
    if (environment.fixtureEnabled)
      return LocalStorageService.retrieveData<Employee[]>('employeesData') ?? [];

    throw new Error('Not implemented: EmployeeService.getAllEmployees');
  }
  public static async createEmployee(newEmployee: Employee): Promise<void> {
    if (environment.fixtureEnabled) {
      LocalStorageService.addDataItem<Employee>('employeesData', newEmployee);
      return;
    }

    throw new Error('Not implemented: EmployeeService.createEmployee');
  }
};