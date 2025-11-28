import { Link } from "react-router-dom";
import useFormSuccessModal from "../components/form/useFormSuccessModal";
import { useEmployees } from "../data/api/hook/useEmployees.ts";
import { Form, type FormDataObject } from "../components/form/Form.tsx";
import getCreateEmployeeForm from "../components/form/schema/CreateEmployeeFormSchema.ts";
import z from "zod";
import useUSStatesData from "../data/api/hook/useUSStatesData.ts";
import useJobDepartmentData from "../data/api/hook/useJobDepartmentData.ts";

const EmployeeObject = z.object({
  birthDate: z.string(),
  city: z.string(),
  department: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  startDate: z.string(),
  state: z.string(),
  street: z.string(),
  zipCode: z.string()
})

export default function CreateEmployeePage() {
  const { openSuccessModal } = useFormSuccessModal();
  const { createEmployee } = useEmployees();
  const { data: usStatesData, isLoading: isUsStatesLoading } = useUSStatesData();
  const { data: jobDepartmentData, isLoading: isJobDepartmentsLoading } = useJobDepartmentData();

  const onSubmit = async (formData: FormDataObject) => {
    if (!formData)
      return;

    createEmployee(EmployeeObject.parse(formData));
    openSuccessModal("Employee created !");

    return {
      success: true,
      errors: {},
    }
  };

  return (
    <>
      <header className="container">
        <h1>HRnet</h1>
        <Link to="/employee-list">View Current Employees</Link>
      </header>
      <main className="container main-container">
        <h2>Create Employee</h2>
        {isUsStatesLoading || isJobDepartmentsLoading ? (
          <p>Loading data...</p>
        ): (
          <Form
            onSubmit={onSubmit}
            schema={getCreateEmployeeForm({
              usStatesData,
              jobDepartmentData
            })}
            submitButtonLabel="Save"
          />
        )}
      </main>
    </>
  );
}
