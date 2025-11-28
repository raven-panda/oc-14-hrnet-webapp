export type AvailableLocalStorageKey =
| "employeesData";

export default class LocalStorageService {
  public static setData<TData>(key: AvailableLocalStorageKey, data: TData) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public static retrieveData<TData>(key: AvailableLocalStorageKey): TData | undefined {
    const rawData = localStorage.getItem(key);
    return rawData ? JSON.parse(rawData) : undefined;
  }

  public static addDataItem<TItem>(key: AvailableLocalStorageKey, item: TItem) {
    const existingData = this.retrieveData<TItem[]>(key) ?? [];
    existingData.push(item);
    this.setData<TItem[]>(key, existingData);
  }

  public static isKeyUsedAndDataPresent(key: AvailableLocalStorageKey): boolean {
    return !!localStorage.getItem(key);
  }
}