import FilterableTable, { type FilterableTableColumn } from "../components/EmployeeTable";

export default function EmployeesListPage() {
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

  return (
    <>
      <header className="container">
        <h1>Current Employees</h1>
      </header>
      <main className="container">
        <FilterableTable columns={columns} />
      </main>
    </>
  );
}