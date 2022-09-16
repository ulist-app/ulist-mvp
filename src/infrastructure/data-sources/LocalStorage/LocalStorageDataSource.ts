export interface LocalStorageDataSource<T> {
  get(): T;

  set(item: T): void;
}
