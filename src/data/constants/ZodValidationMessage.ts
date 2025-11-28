export class ZodValidationMessage {
  public static string = {
    dateNotPicked: `You must pick a date`,
    atLeastGivenChars: (count: number) => `Type at least ${count} characters`,
  }
}
