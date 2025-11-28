export class ZodValidationUtils {
  public static dateMustBeBeforeGiven(dateString: string, givenDate: Date): boolean {
    const inputDate = new Date(dateString);
    return !Number.isNaN(inputDate.getTime()) && inputDate.getTime() < givenDate.getTime();
  }

  public static dateMustBeBeforeToday(dateString: string): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return ZodValidationUtils.dateMustBeBeforeGiven(dateString, today);
  }
}