export default class MapStorage implements Storage {
  readonly store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    const item = this.store.get(key);
    return item === undefined ? null : item;
  }

  key(index: number): string | null {
    let i = 0;
    for (const key of this.store.keys()) {
      if (i === index) {
        return key;
      }
      i++;
    }
    return null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
}
