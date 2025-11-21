import { Link } from "react-router-dom";
import CreateEmployeeForm from "../components/form/imp/CreateEmployeeForm";
import useFormSuccessModal from "../components/form/useFormSuccessModal";
import type { FormDataObject } from "../components/form/Form.tsx";
import { useEmployees } from "../data/api/hook/useEmployees.ts";

export default function CreateEmployeePage() {
  const { openSuccessModal } = useFormSuccessModal();
  const { createEmployee } = useEmployees();

  const onSubmit = (formData: FormDataObject | undefined) => {
    if (!formData)
      return;

    console.log({formData});
    createEmployee(formData);
    openSuccessModal("Employee created !");
  };

  return (
    <>
      <header className="container">
        <h1>HRnet</h1>
        <Link to="/employee-list">View Current Employees</Link>
      </header>
      <main className="container">
        <h2>Create Employee</h2>
        <CreateEmployeeForm onSubmit={onSubmit} />
      </main>
    </>
  );
}
