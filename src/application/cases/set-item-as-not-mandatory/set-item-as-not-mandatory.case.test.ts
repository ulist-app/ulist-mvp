import {ItemRepository} from "../../repositories";
import {Item} from "../../../core";
import {SetItemAsNotMandatoryCase} from "./set-item-as-not-mandatory.case";

describe('Set item as not mandatory use case should', () => {
  it('set item property isMandatory to false', async () => {
    const item = new Item({isMandatory: true})
    const itemsRepository = {
      findById: jest.fn(async () => item),
      save: jest.fn()
    } as unknown as ItemRepository

    await new SetItemAsNotMandatoryCase(itemsRepository).exec(item.id)

    expect(itemsRepository.save).toHaveBeenCalledWith({
      ...item,
      isMandatory: false
    })
  })
})
