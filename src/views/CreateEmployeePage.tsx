import { Link } from "react-router-dom";
import CreateEmployeeForm from "../components/form/imp/CreateEmployeeForm";
import useFormSuccessModal from "../components/form/useFormSuccessModal";

export default function CreateEmployeePage() {
  const { openSuccessModal } = useFormSuccessModal();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);

    console.log({formData});
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