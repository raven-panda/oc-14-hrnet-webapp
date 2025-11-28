import type { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, ReactNode } from "react";
import { type StandardSchemaV1Issue, useForm } from '@tanstack/react-form';
import { extractFormSchemaValues, formatFieldValidators, isFieldRequired, zodErrorsToFieldIssues, } from './FormUtils';
import styles from '../../assets/css/modules/form.module.css';
import z, { type ZodType } from 'zod';
import "react-datepicker/dist/react-datepicker.css";
import SelectMenu, { type SelectMenuOption } from "./SelectMenu";

export type FormDataValue = string | number | boolean | object;
export type FormDataObject = Record<string, FormDataValue>;

export interface SubmitButtonProps {
  canSubmit: boolean;
}
export interface CancelButtonProps {
  reset: () => void;
}

export type FieldValidator = (value: unknown) => string | undefined;
export type FormSchema = FormSchemaGroup[];
export interface FormSchemaGroup {
  layoutType: 'row' | 'column';
  gap?: 'small' | 'medium' | 'large';
  withBorder?: boolean;
  legend?: string;
  fields: {
    [key: string]: FormSchemaField;
  };
}
export interface FormSchemaField {
  defaultValue: FormDataValue;
  label?: string;
  type?: HTMLInputTypeAttribute | 'select';
  autocomplete?: HTMLInputAutoCompleteAttribute;
  validator?: ZodType;
  placeholder?: string;
  selectOptions?: SelectMenuOption[]
}

export function Form({
  schema,
  submitButton = ({ canSubmit }) => (
    <button type="submit" disabled={!canSubmit} className={styles.submitButton}>
      Submit
    </button>
  ),
  cancelButton,
  onSubmit,
  className,
}: {
  schema: FormSchema;
  submitButton?: (props: SubmitButtonProps) => ReactNode;
  cancelButton?: (props: CancelButtonProps) => ReactNode;
  onSubmit: (value: FormDataObject) => Promise<
    | {
    success: boolean;
    errors: Record<string, StandardSchemaV1Issue | undefined>;
  }
    | undefined
  >;
  className?: string;
}) {
  const form = useForm({
    defaultValues: extractFormSchemaValues(schema),
    validators: {
      onSubmitAsync: async ({ value }) => {
        
        const response = await onSubmit(value);
        if (!response) return null;

        return { fields: response.errors };
      },
      onChange: ({ value }) => {
        const zodShape = formatFieldValidators(schema);

        const zodSchema = z.object(zodShape as Record<string, z.ZodTypeAny>);

        const result = zodSchema.safeParse(value as Record<string, unknown>);

        if (result.success) {
          return null;
        }

        return { fields: zodErrorsToFieldIssues(result.error) };
      },
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      noValidate
      className={className}
    >
      {schema.map((fieldGroup, key) => (
        <fieldset
          key={fieldGroup.layoutType + key}
          className={[
            styles[`formGroup_${fieldGroup.layoutType}`],
            styles[`formGroupGap_${fieldGroup.gap}`] ?? '',
            !fieldGroup.withBorder ? styles.formGroupWithoutBorder : null
          ].filter(style => style).join(' ')}
        >
          {fieldGroup.legend && <legend>{fieldGroup.legend}</legend>}
          {Object.keys(fieldGroup.fields).map((fieldName) => (
            <div
              key={fieldName}
              className={
                fieldGroup.fields[fieldName].type !== 'checkbox'
                  ? styles.inputTextWrapper
                  : styles.inputCheckboxWrapper
              }
            >
              <form.Field
                name={fieldName}
                children={(field) => (
                  <>
                    {fieldGroup.fields[fieldName].label &&
                      fieldGroup.fields[fieldName].type !== 'checkbox' && (
                        <label htmlFor={field.name}>
                          {fieldGroup.fields[fieldName].label}
                          {isFieldRequired(
                            fieldGroup.fields[fieldName].validator,
                          ) && <em className={styles.requiredAsterisk}>*</em>}
                        </label>
                      )}
                    {fieldGroup.fields[fieldName].type === "select" ? (
                      <SelectMenu
                        id={field.name}
                        name={field.name}
                        options={fieldGroup.fields[fieldName].selectOptions ?? []}
                        defaultValue={String(fieldGroup.fields[fieldName].defaultValue)}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                        }}
                      />
                    ) : (
                      <input
                        id={field.name}
                        className={[
                          fieldGroup.fields[fieldName].type === 'checkbox'
                            ? styles.checkboxField
                            : styles.inputField,
                          field.state.meta.isTouched && !field.state.meta.isValid
                            ? styles.invalidField
                            : '',
                        ].join(' ')}
                        type={fieldGroup.fields[fieldName].type}
                        autoComplete={fieldGroup.fields[fieldName].autocomplete}
                        placeholder={fieldGroup.fields[fieldName].placeholder}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          if (fieldGroup.fields[fieldName].type === 'checkbox') {
                            field.handleChange(e.target.checked);
                          } else {
                            field.handleChange(e.target.value);
                          }
                        }}
                        value={
                          fieldGroup.fields[fieldName].type !== 'checkbox'
                            ? String(field.state.value)
                            : undefined
                        }
                        checked={
                          fieldGroup.fields[fieldName].type === 'checkbox'
                            ? String(field.state.value) === 'true'
                            : undefined
                        }
                      />
                    )}
                    {fieldGroup.fields[fieldName].label &&
                      fieldGroup.fields[fieldName].type === 'checkbox' && (
                        <label htmlFor={field.name}>
                          {fieldGroup.fields[fieldName].label}
                        </label>
                      )}
                    {field.state.meta.isTouched && !field.state.meta.isValid ? (
                      <em className={styles.errorLabel}>
                        {field.state.meta.errors
                          .map((e) => e?.message)
                          .filter((e) => e)
                          .join(', ')}
                      </em>
                    ) : null}
                    {field.state.meta.isValidating ? 'Validating...' : null}
                  </>
                )}
              />
            </div>
          ))}
        </fieldset>
      ))}
      <div className={styles.formFooter}>
        <form.Subscribe
          selector={(state) => [state.canSubmit]}
          children={([canSubmit]) => submitButton({ canSubmit })}
        />
        {cancelButton?.({ reset: form.reset })}
      </div>
    </form>
  );
}
