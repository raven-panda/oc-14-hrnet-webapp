import { useMemo } from "react";
import { useEmployeesData } from "../components/employees/EmployeeHooks";
import FilterableTable, { type FilterableTableColumn, type FilterableTableData } from "../components/employees/EmployeeTable";

export default function EmployeesListPage() {
  const { data, isLoading } = useEmployeesData();

  const columns: FilterableTableColumn[] = [
    {
      name: "First Name",
    },
    {
      name: "Last Name",
    },
    {
      name: "Start Date",
    },
    {
      name: "Department",
    },
    {
      name: "Date of Birth",
    },
    {
      name: "Street",
    },
    {
      name: "City",
    },
    {
      name: "State",
    },
    {
      name: "Zip Code",
    },
  ];

  const transformedTableData: FilterableTableData[] | undefined = useMemo(() => {
    return data?.map(obj => ({
      values: []
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