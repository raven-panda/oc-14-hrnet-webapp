import { Link } from "react-router-dom";
import SelectMenu from "../components/form/SelectMenu";
import InputControl from "../components/form/TextInput";
import { statesSelectData } from "../components/select-data/StatesSelectData";
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
        <form action="#" noValidate onSubmit={onSubmit}>
          <InputControl label="First Name" type="text" id="first-name" />
          <InputControl label="Last Name" type="text" id="last-name" />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <input id="date-of-birth" type="text" />

          <label htmlFor="start-date">Start Date</label>
          <input id="start-date" type="text" />

          <fieldset className="address">
              <legend>Address</legend>

              <label htmlFor="street">Street</label>
              <input id="street" type="text" />

              <label htmlFor="city">City</label>
              <input id="city" type="text" />

              <SelectMenu
                label="State"
                name="state"
                id="state"
                options={statesSelectData.map(data => ({ text: data.name, value: data.abbreviation }))}
              />

              <label htmlFor="zip-code">Zip Code</label>
              <input id="zip-code" type="number" />
          </fieldset>

          <div>
            <SelectMenu
              label="Department"
              name="department"
              id="department"
              options={[
                { text: 'Sales', value: 'Sales' },
                { text: 'Marketing', value: 'Marketing' },
                { text: 'Engineering', value: 'Engineering' },
                { text: 'Human Resources', value: 'Human Resources' },
                { text: 'Legal', value: 'Legal' },
              ]}
            />
          </div>
          
          <button type="submit" className="submit-button">Save</button>
        </form>
      </main>
    </>
  );
}