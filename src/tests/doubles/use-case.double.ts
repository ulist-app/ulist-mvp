import { UseCase } from "../../application";

export class UseCaseDouble<R = any> implements UseCase<any, Promise<R>> {
  protected execCount = -1;
  protected execSpy = jest.fn();

  constructor(private readonly onExec = [] as Array<R>) {}

  async exec(input: void): Promise<R> {
    this.execSpy();
    this.execCount++;
    if (this.execCount > this.onExec.length - 1) {
      this.execCount = 0;
    }
    return this.onExec[this.execCount];
  }

  assertHasBeenCalled() {
    expect(this.execSpy).toHaveBeenCalled();
  }

  assertHasBeenCalledTimes(times: number) {
    expect(this.execSpy).toHaveBeenCalledTimes(times);
  }
}
