import {
  GetAllItemsCase,
  SetItemAsMandatoryCase,
  SetItemAsNotMandatoryCase,
  SetItemAsNotRequiredCase,
  SetItemAsRequiredCase,
  UseCases,
} from "../../application";
import { GetAllItemsCaseDouble } from "../doubles";
import { UseCaseDouble } from "../doubles/use-case.double";

type ValueOf<T> = T[keyof T];

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
  }: Partial<Record<keyof UseCases, ValueOf<UseCases>>> = {}) {
    this.getAllItems = (getAllItems ||
      new GetAllItemsCaseDouble()) as GetAllItemsCase;
    this.setItemAsRequired = (setItemAsRequired ||
      new UseCaseDouble()) as SetItemAsRequiredCase;
    this.setItemAsNotRequired = (setItemAsNotRequired ||
      new UseCaseDouble()) as SetItemAsNotRequiredCase;
    this.setItemAsMandatory = (setItemAsMandatory ||
      new UseCaseDouble()) as SetItemAsMandatoryCase;
    this.setItemAsNotMandatory = (setItemAsNotMandatory ||
      new UseCaseDouble()) as SetItemAsNotMandatoryCase;
  }

  static init(): UseCasesBuilder {
    return new UseCasesBuilder();
  }

  static random(): UseCases {
    return new UseCasesBuilder().build();
  }

  withGetAllItemsCase(
    getAllItems: GetAllItemsCase | UseCaseDouble
  ): UseCasesBuilder {
    this.getAllItems = getAllItems as GetAllItemsCase;
    return this;
  }

  withSetItemAsRequiredCase(
    setItemAsRequired: SetItemAsRequiredCase | UseCaseDouble
  ): UseCasesBuilder {
    this.setItemAsRequired = setItemAsRequired as SetItemAsRequiredCase;
    return this;
  }

  withSetItemAsNotRequiredCase(
    setItemAsNotRequired: SetItemAsNotRequiredCase | UseCaseDouble
  ): UseCasesBuilder {
    this.setItemAsNotRequired =
      setItemAsNotRequired as SetItemAsNotRequiredCase;
    return this;
  }

  withSetItemAsMandatoryCase(
    setItemAsMandatory: SetItemAsMandatoryCase | UseCaseDouble
  ): UseCasesBuilder {
    this.setItemAsMandatory = setItemAsMandatory as SetItemAsMandatoryCase;
    return this;
  }

  withSetItemAsNotMandatoryCase(
    setItemAsNotMandatory: SetItemAsNotMandatoryCase | UseCaseDouble
  ): UseCasesBuilder {
    this.setItemAsNotMandatory =
      setItemAsNotMandatory as SetItemAsNotMandatoryCase;
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
