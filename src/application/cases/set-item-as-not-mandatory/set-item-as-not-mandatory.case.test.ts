import {ItemRepository} from "../../repositories";
import {SetItemAsNotMandatoryCase} from "./set-item-as-not-mandatory.case";
import {ItemBuilder} from "../../../tests/builders/ItemBuilder";

describe('Set item as not mandatory use case should', () => {
  it('set item properties isMandatory and buy to false', async () => {
    const item = ItemBuilder.initialize().withIsMandatory(true).withIsRequired(true).build()
    const itemsRepository = {
      findById: jest.fn(async () => item),
      save: jest.fn()
    } as unknown as ItemRepository

    await new SetItemAsNotMandatoryCase(itemsRepository).exec(item.id)

    expect(itemsRepository.save).toHaveBeenCalledWith({
      ...item,
      isMandatory: false,
      isRequired: false
    })
  })
})
