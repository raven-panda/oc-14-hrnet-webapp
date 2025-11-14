export interface FormProps {
  onSubmit: (formData: Record<string, string | number | object>) => void;
}