import z from 'zod';
import type { FormSchema } from "../Form.tsx";
import { ZodValidationMessage } from "../../../data/constants/ZodValidationMessage.ts";
import type { USState } from '../../../data/api/definitions/USStates.ts';
import type { JobDepartment } from '../../../data/api/definitions/JobDepartment.ts';

export default function getCreateEmployeeForm({
  usStatesData,
  jobDepartmentData,
} : {
  usStatesData?: USState[];
  jobDepartmentData?: JobDepartment[];
}): FormSchema {
  return [
    {
      layoutType: 'column',
      gap: 'small',
      fields: {
        firstName: {
          label: 'First Name',
          defaultValue: '',
          autocomplete: 'name',
          validator: z.string().min(2, ZodValidationMessage.string.atLeastGivenChars(2)),
        },
        lastName: {
          label: 'Last Name',
          defaultValue: '',
          autocomplete: 'family-name',
          validator: z.string().min(2, ZodValidationMessage.string.atLeastGivenChars(2)),
        },
        birthDate: {
          label: 'Date of Birth',
          type: 'date',
          defaultValue: '',
          validator: z.string().min(2, ZodValidationMessage.string.dateNotPicked),
        },
        startDate: {
          label: 'Start Date',
          type: 'date',
          defaultValue: '',
          validator: z.string().nonempty(ZodValidationMessage.string.dateNotPicked),
        },
      },
    },
    {
      layoutType: 'column',
      gap: 'medium',
      withBorder: true,
      legend: "Address",
      fields: {
        street: {
          label: 'Street',
          defaultValue: '',
          autocomplete: 'address-line1',
          validator: z.string().min(2, ZodValidationMessage.string.atLeastGivenChars(2)),
        },
        city: {
          label: 'City',
          defaultValue: '',
          autocomplete: 'address-level2',
          validator: z.string().min(2, ZodValidationMessage.string.atLeastGivenChars(2)),
        },
        state: {
          label: 'State',
          type: 'select',
          defaultValue: '',
          autocomplete: 'off',
          validator: z.string().min(2, ZodValidationMessage.string.atLeastGivenChars(2)),
          selectOptions: usStatesData?.map(data => ({
            text: data.name,
            value: data.abbreviation,
          }))
        },
        zipCode: {
          label: 'Zip Code',
          defaultValue: '',
          autocomplete: '',
          validator: z.string().min(2, ZodValidationMessage.string.atLeastGivenChars(2)),
        },
      },
    },
    {
      layoutType: 'column',
      gap: 'medium',
      fields: {
        department: {
          label: 'Department',
          type: 'select',
          defaultValue: '',
          autocomplete: 'off',
          validator: z.string().min(2, ZodValidationMessage.string.atLeastGivenChars(2)),
          selectOptions: jobDepartmentData
        },
      },
    },
  ];
}
