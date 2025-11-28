export class ZodValidationMessage {
  public static string = {
    dateNotPicked: `You must pick a date`,
    dateMustBeBeforeToday: `The date must be before today`,
    selectNotPicked: `You must pick a value`,
    atLeastGivenChars: (count: number) => `Type at least ${count} characters`,
  }
  public static address = {
    invalidZipCode: 'The zip code is invalid',
  }
}
