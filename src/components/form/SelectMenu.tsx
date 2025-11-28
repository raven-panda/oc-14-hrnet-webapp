export interface SelectMenuOption {
  text: string;
  value: string;
}

export default function SelectMenu({ options, ...props }: { options: SelectMenuOption[]; } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <>
      <select { ...props }>
        <option key={"noOptionSelected"} value={""} hidden>---Select a value---</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.text}</option>
        ))}
      </select>
    </>
  );
}
