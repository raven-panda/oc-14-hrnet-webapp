import styles from "../../assets/css/modules/form.module.css";
import type { FormEvent, ReactNode } from "react";

export type FormDataObject = Record<string, string | number | object>;

export interface FormProps {
  onSubmit: (formData?: FormDataObject) => void;
  children?: ReactNode;
  submitButtonLabel?: string;
}

export function Form({
  onSubmit,
  children,
  submitButtonLabel,
}: FormProps) {
  const submitEventHandler = (e: FormEvent<HTMLFormElement>) =>  {
    e.preventDefault();
    onSubmit();
  }
  return (
    <form action="#" noValidate onSubmit={submitEventHandler} className={styles.form}>
      {children}

      <button type="submit" className={styles.submitButton}>{submitButtonLabel ?? "Submit"}</button>
    </form>
  )
}
