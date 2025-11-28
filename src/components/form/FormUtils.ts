import type { z, ZodType } from 'zod';
import type { FormDataObject, FormDataValue, FormSchema } from './Form';
import type { $ZodCheck, $ZodCheckMinLength } from 'zod/v4/core';
import type { StandardSchemaV1Issue } from '@tanstack/react-form';

export function extractFormSchemaValues(
  schema: FormSchema,
): FormDataObject {
  const defaultValues: Record<string, FormDataValue> = {};

  for (const formGroup of schema) {
    for (const fieldName in formGroup.fields) {
      defaultValues[fieldName] = formGroup.fields[fieldName].defaultValue;
    }
  }

  return defaultValues;
}

export function formatFieldValidators(
  schema: FormSchema,
): Record<string, ZodType> {
  const validators: Record<string, ZodType> = {};

  for (const formGroup of schema) {
    for (const fieldName in formGroup.fields) {
      if (formGroup.fields[fieldName].validator)
        validators[fieldName] = formGroup.fields[fieldName].validator;
    }
  }

  return validators;
}

/**
 * Checks if given zod field validator contains a minimal length of at least 1 character condition
 * @param validator Zod validator of the field
 * @returns {boolean} `true` if a minimal length of at least 1 character condition was found
 */
export function isFieldRequired(validator?: ZodType): boolean {
  if (!validator) return false;

  const def = validator.def;
  return (
    def.type === 'string' &&
    !!def.checks &&
    def.checks.some(
      (c: unknown) =>
        !!(c as $ZodCheck<unknown>)._zod?.def?.check && (c as $ZodCheck<unknown>)._zod.def.check === 'min_length' &&
        !!(c as $ZodCheckMinLength)._zod?.def?.minimum && (c as $ZodCheckMinLength)._zod.def.minimum > 0,
    )
  );
}

export function zodErrorsToFieldIssues(err: z.ZodError<any>): Record<string, StandardSchemaV1Issue | undefined> {
  const fields: Record<string, StandardSchemaV1Issue | undefined> = {};
  if ('errors' in err) {
    (err.errors as any[]).forEach((e: any) => {
      const key = String(e.path?.[0] ?? "");
      // StandardSchemaV1Issue a typiquement { message?: string; ... }
      // on fournit au minimum message (ajoute d'autres props si nécessaire)
      fields[key] = { message: e.message } as StandardSchemaV1Issue;
    });
  return fields;
  } else {
    return {};
  }
}
