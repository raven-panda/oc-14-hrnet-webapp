import type { FormEventHandler } from "react";

export interface FormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}