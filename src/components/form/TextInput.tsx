export default function InputControl({ label, error, ...props }: { label: string; error?: string; } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input { ...props } />
      {error && <div>{error}</div>}
    </>
  );
}
