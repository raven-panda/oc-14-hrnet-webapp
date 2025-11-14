import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerInput({ label, name, id, onChange }: { label: string; name: string; id?: string; onChange: (name: string, value: Date | null) => void; }) {
  const [value, setValue] = useState<Date | null>(null);
  
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <DatePicker selected={value} dateFormat="dd/MM/YYYY" name={name} id={id ?? name} onChange={(value) => { setValue(value); onChange(name, value); }} />
    </>
  );
}