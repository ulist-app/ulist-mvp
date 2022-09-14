import {ItemRepository} from "../../repositories";
import {Item} from "../../../core";
import {SetItemAsMandatoryCase} from "./set-item-as-mandatory.case";

describe('Set item as mandatory use case should', () => {
  it('set item isMandatory property to true', async () => {
    const item = new Item({isMandatory: false})
    const itemsRepository = {
      findById: jest.fn(async () => item),
      save: jest.fn()
    } as unknown as ItemRepository

    await new SetItemAsMandatoryCase(itemsRepository).exec(item.id)

    expect(itemsRepository.save).toHaveBeenCalledWith({
      ...item,
      isMandatory: true
    })
  })
})
