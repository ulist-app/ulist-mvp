import {UseCase} from "../use-case";
import {Id} from "../../../core";
import {ItemRepository} from "../../repositories";

type Input = Id;
type Output = Promise<void>

export class SetItemAsNotMandatoryCase implements UseCase<Input, Output> {
  constructor(private readonly itemsRepository: ItemRepository) {}
  async exec(id: Id): Promise<void> {
    const item = await this.itemsRepository.findById(id)
    await this.itemsRepository.save({
      ...item,
      isRequired: false,
      isMandatory: false
    })
  }
}
