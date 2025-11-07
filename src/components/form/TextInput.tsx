export default function InputControl({ label, ...props }: { label: string; } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input { ...props } />
    </>
  );
}