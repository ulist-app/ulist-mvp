import {LocalStorageDataSource} from "../../infrastructure/data-sources/LocalStorage/LocalStorageDataSource";

interface LocalStorageDoubleParams {
  onGet?: any
}

export class LocalStorageDouble<T> implements LocalStorageDataSource<T>{
  private readonly getSpy = jest.fn()
  private readonly setSpy = jest.fn()

  private readonly onGet = null

  constructor(params: LocalStorageDoubleParams = {}) {
    this.onGet = params.onGet
  }

  get(): T {
    this.getSpy()
    return this.onGet as T;
  }

  set(item: T): void {
    this.setSpy(item)
  }

  assertSetHasBeenCalledWith(item: T) {
    expect(this.setSpy).toHaveBeenCalledWith(item)
  }

  assertGetHasBeenCalled() {
    expect(this.getSpy).toBeCalled()
  }
}
