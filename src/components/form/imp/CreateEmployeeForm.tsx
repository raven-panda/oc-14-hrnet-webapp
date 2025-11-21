import { useState } from 'react';
import { statesSelectData } from '../../../data/StatesSelectData.ts';
import { Form, type FormProps } from '../Form';
import SelectMenu from '../SelectMenu';
import InputControl from '../TextInput';
import DatePickerInput from '../DatePickerInput';
import { format as formatDate } from 'date-format-parse';
import { DATE_WITH_SLASH_FORMAT } from "../../../data/constants/DateFormat.ts";

export default function CreateEmployeeForm({
  onSubmit
}: FormProps) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleDateChange = (name: string, value: Date | null) => {
    const parsedDate = value ? formatDate(value, DATE_WITH_SLASH_FORMAT) : "";
    setFormData({...formData, [name]: parsedDate});
  }

  return (
    <Form onSubmit={() => onSubmit(formData)}>
      <InputControl label="First Name" onChange={handleInputChange} type="text" name="firstName" />
      <InputControl label="Last Name" onChange={handleInputChange} type="text" name="lastName" />

      <DatePickerInput label="Date of Birth" name='dateOfBirth' onChange={handleDateChange} />
      <DatePickerInput label="Start Date" name='startDate' onChange={handleDateChange} />

      <fieldset className="address">
          <legend>Address</legend>

          <InputControl label="Street" onChange={handleInputChange} type="text" name="street" />
          <InputControl label="City" onChange={handleInputChange} type="text" name="city" />

          <SelectMenu
            label="State"
            name="state"
            onChange={handleInputChange}
            options={statesSelectData.map(data => ({ text: data.name, value: data.abbreviation }))}
          />

          <InputControl label="Zip Code" onChange={handleInputChange} type="text" name="zipCode" />
      </fieldset>

      <div>
        <SelectMenu
          label="Department"
          name="department"
          onChange={handleInputChange}
          options={[
            { text: 'Sales', value: 'Sales' },
            { text: 'Marketing', value: 'Marketing' },
            { text: 'Engineering', value: 'Engineering' },
            { text: 'Human Resources', value: 'Human Resources' },
            { text: 'Legal', value: 'Legal' },
          ]}
        />
      </div>
    </Form>
  )
}
