interface SelectMenuOption {
  text: string;
  value: string;
}

export default function SelectMenu({ options, label, ...props }: { options: SelectMenuOption[]; label: string; } & React.SelectHTMLAttributes<HTMLSelectElement>) {  
  return (
    <>
      <label htmlFor="department">{label}</label>
      <select { ...props }>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.text}</option>
        ))}
      </select>
    </>
  );
}