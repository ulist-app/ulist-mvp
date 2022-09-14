export class LocalStorage<T> {
  constructor(private readonly collection: string) {}

  get(): T {
    const item = localStorage.getItem(this.collection);
    const numPatt = new RegExp(/^\d+$/);
    const jsonPatt = new RegExp(/[\[\{].*[\}\]]/);

    if (item) {
      if (jsonPatt.test(item)) {
        return JSON.parse(item);
      } else if (numPatt.test(item)) {
        return parseFloat(item) as T;
      } else {
        return item as T;
      }
    } else {
      return null as T;
    }

  }

  set(item: T) {
    if (typeof item === "object") {
      localStorage.setItem(this.collection, JSON.stringify(item));
    } else {
      localStorage.setItem(this.collection, item as string);
    }
  }

  remove() {
    localStorage.removeItem(this.collection);
  }
}
