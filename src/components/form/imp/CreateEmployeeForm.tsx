import styles from '../../../assets/css/modules/form.module.css';
import { statesSelectData } from '../../select-data/StatesSelectData';
import type { FormProps } from '../Form';
import SelectMenu from '../SelectMenu';
import InputControl from '../TextInput';

export default function CreateEmployeeForm({
  onSubmit
}: FormProps) {
  return (
    <form action="#" noValidate onSubmit={onSubmit} className={styles.form}>
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
      
      <button type="submit" className={styles.submitButton}>Save</button>
    </form>
  )
}