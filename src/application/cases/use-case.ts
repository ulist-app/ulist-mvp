import { GetAllItemsCase } from "./get-all-items/get-all-items.case";
import { SetItemAsRequiredCase } from "./set-item-as-required/set-item-as-required.case";
import { SetItemAsNotRequiredCase } from "./set-item-as-not-required/set-item-as-not-required.case";
import { SetItemAsMandatoryCase } from "./set-item-as-mandatory/set-item-as-mandatory.case";
import { SetItemAsNotMandatoryCase } from "./set-item-as-not-mandatory/set-item-as-not-mandatory.case";

export interface UseCase<Input, Output> {
  exec(input: Input): Output;
}

export interface UseCases {
  getAllItems: GetAllItemsCase;
  setItemAsRequired: SetItemAsRequiredCase;
  setItemAsNotRequired: SetItemAsNotRequiredCase;
  setItemAsMandatory: SetItemAsMandatoryCase;
  setItemAsNotMandatory: SetItemAsNotMandatoryCase;
}
