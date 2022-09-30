import {UseCase} from "../../application";
import {ItemList} from "../../domain";
import {ItemBuilder} from "../builders";

export class GetAllItemsCaseDouble implements UseCase<void, Promise<ItemList>> {
  private execCount = -1
  private execSpy = jest.fn()

  constructor(private readonly onExec = [new ItemList(Array.from({length: 3}).map(ItemBuilder.random))]) {
  }

  async exec(input: void): Promise<ItemList> {
    this.execSpy()
    this.execCount++
    if (this.execCount > (this.onExec.length - 1)) {
      this.execCount = 0
    }
    return this.onExec[this.execCount];
  }

  assertHasBeenCalled() {
    expect(this.execSpy).toHaveBeenCalled()
  }

  assertHasBeenCalledTimes(times: number) {
    expect(this.execSpy).toHaveBeenCalledTimes(times)
  }

}
