import { FilterableTable, type FilterableTableColumn, type FilterableTableData } from "@raven_panda/filterable-table";
import "@raven_panda/filterable-table/dist/index.css";
import { useMemo } from "react";
import type { Employee } from "../data/api/definitions/Employee";
import { useEmployees } from "../data/api/hook/useEmployees.ts";
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
      dataType: "date",
    },
    {
      name: "Department",
      dataKey: "department",
    },
    {
      name: "Date of Birth",
      dataKey: "birthDate",
      dataType: "date",
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
      dataType: "number",
    },
  ];

  const transformedTableData: FilterableTableData[] | undefined = useMemo(() => {
    if (!data)
      return undefined;

    return data.map(employee => ({
      values: {
        ...employee,
      }
    }));
  }, [data]);

  return (
    <>
      <header className="container">
        <h1>Current Employees</h1>
      </header>
      <main className="container main-container">
        <FilterableTable
          columns={columns}
          dataList={transformedTableData}
          isLoading={isLoading}
          dateFormat={DATE_WITH_SLASH_FORMAT}
        />
      </main>
    </>
  );
}
