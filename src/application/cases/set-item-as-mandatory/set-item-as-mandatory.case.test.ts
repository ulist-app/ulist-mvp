import {ItemRepository} from "../../repositories";
import {SetItemAsMandatoryCase} from "./set-item-as-mandatory.case";
import {ItemBuilder} from "../../../tests/builders/ItemBuilder";

describe('Set item as mandatory use case should', () => {
  it('set item isMandatory and buy properties to true', async () => {
    const item = ItemBuilder.initialize().withIsMandatory(false).withIsRequired(false).build()
    const itemsRepository = {
      findById: jest.fn(async () => item),
      save: jest.fn()
    } as unknown as ItemRepository

    await new SetItemAsMandatoryCase(itemsRepository).exec(item.id)

    expect(itemsRepository.save).toHaveBeenCalledWith({
      ...item,
      isMandatory: true,
      isRequired: true
    })
  })
})
