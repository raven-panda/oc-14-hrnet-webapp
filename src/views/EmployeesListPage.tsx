import { useMemo } from "react";
import FilterableTable, { type FilterableTableColumn, type FilterableTableData } from "../components/employees/EmployeeTable";
import type { Employee } from "../data/api/definitions/Employee";
import { useEmployees } from "../data/api/hook/useEmployees.ts";
import { format as formatDate } from "date-format-parse";
import { DATE_WITH_SLASH_FORMAT } from "../data/constants/DateFormat.ts";

export default function EmployeesListPage() {
  const { data, isLoading } = useEmployees();

  const columns: FilterableTableColumn<keyof Employee>[] = [
    {
      name: "First Name",
      dataKey: "firstName",
    },
    {
      name: "Last Name",
      dataKey: "lastName",
    },
    {
      name: "Start Date",
      dataKey: "startDate",
    },
    {
      name: "Department",
      dataKey: "department",
    },
    {
      name: "Date of Birth",
      dataKey: "birthDate",
    },
    {
      name: "Street",
      dataKey: "street",
    },
    {
      name: "City",
      dataKey: "city",
    },
    {
      name: "State",
      dataKey: "state",
    },
    {
      name: "Zip Code",
      dataKey: "zipCode",
    },
  ];

  const transformedTableData: FilterableTableData[] | undefined = useMemo(() => {
    if (!data)
      return undefined;

    return data.map(employee => ({
      values: {
        ...employee,
        birthDate: formatDate(new Date(employee.birthDate), DATE_WITH_SLASH_FORMAT),
        startDate: formatDate(new Date(employee.startDate), DATE_WITH_SLASH_FORMAT),
      }
    }));
  }, [data]);

  return (
    <>
      <header className="container">
        <h1>Current Employees</h1>
      </header>
      <main className="container">
        <FilterableTable columns={columns} className="test-table" dataList={transformedTableData} isLoading={isLoading} />
      </main>
    </>
  );
}
