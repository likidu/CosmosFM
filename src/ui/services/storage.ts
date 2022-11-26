type StorageKey = 'settings' | 'user' | 'auth' | 'media';

export class Storage {
  static get<T>(key: StorageKey): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  static set<T>(key: StorageKey, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
