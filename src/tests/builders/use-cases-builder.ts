import {
  GetAllItemsCase,
  SetItemAsMandatoryCase,
  SetItemAsNotMandatoryCase,
  SetItemAsNotRequiredCase,
  SetItemAsRequiredCase,
  UseCases,
} from "../../application";
import { GetAllItemsCaseDouble } from "../doubles";

export class UseCasesBuilder {
  private getAllItems: GetAllItemsCase;
  private setItemAsRequired: SetItemAsRequiredCase;
  private setItemAsNotRequired: SetItemAsNotRequiredCase;
  private setItemAsMandatory: SetItemAsMandatoryCase;
  private setItemAsNotMandatory: SetItemAsNotMandatoryCase;

  private constructor({
    getAllItems,
    setItemAsRequired,
    setItemAsNotRequired,
    setItemAsNotMandatory,
    setItemAsMandatory,
  }: Partial<Record<keyof UseCases, { exec: Function }>> = {}) {
    this.getAllItems = (getAllItems ||
      new GetAllItemsCaseDouble()) as unknown as GetAllItemsCase;
    this.setItemAsRequired = {
      exec: setItemAsRequired || jest.fn(async () => {}),
    } as unknown as SetItemAsRequiredCase;
    this.setItemAsNotRequired = {
      exec: setItemAsNotRequired || jest.fn(async () => {}),
    } as unknown as SetItemAsNotRequiredCase;
    this.setItemAsMandatory = {
      exec: setItemAsMandatory || jest.fn(async () => {}),
    } as unknown as SetItemAsMandatoryCase;
    this.setItemAsNotMandatory = {
      exec: setItemAsNotMandatory || jest.fn(async () => {}),
    } as unknown as SetItemAsNotMandatoryCase;
  }

  static init(): UseCasesBuilder {
    return new UseCasesBuilder();
  }

  static random(): UseCases {
    return new UseCasesBuilder().build();
  }

  withGetAllItemsCase(
    getAllItems: GetAllItemsCase | GetAllItemsCaseDouble
  ): UseCasesBuilder {
    this.getAllItems = getAllItems as GetAllItemsCase;
    return this;
  }

  build(): UseCases {
    return {
      getAllItems: this.getAllItems,
      setItemAsRequired: this.setItemAsRequired,
      setItemAsNotRequired: this.setItemAsNotRequired,
      setItemAsMandatory: this.setItemAsMandatory,
      setItemAsNotMandatory: this.setItemAsNotMandatory,
    };
  }
}
