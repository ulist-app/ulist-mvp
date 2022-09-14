import {ItemRepository} from "../../repositories";
import {Item} from "../../../core";
import {SetItemAsNotRequiredCase} from "./set-item-as-not-required.case";

describe('Set item as not required use case should', () => {
  it('set item property isRequired to false', async () => {
    const item = new Item({isRequired: true})
    const itemsRepository = {
      findById: jest.fn(async () => item),
      save: jest.fn()
    } as unknown as ItemRepository

    await new SetItemAsNotRequiredCase(itemsRepository).exec(item.id)

    expect(itemsRepository.save).toHaveBeenCalledWith({
      ...item,
      isRequired: false
    })
  })
  it('set item property isMandatory to false', async () => {
    const item = new Item({isRequired: true, isMandatory: true})
    const itemsRepository = {
      findById: jest.fn(async () => item),
      save: jest.fn()
    } as unknown as ItemRepository

    await new SetItemAsNotRequiredCase(itemsRepository).exec(item.id)

    expect(itemsRepository.save).toHaveBeenCalledWith({
      ...item,
      isRequired: false,
      isMandatory: false
    })
  })
})
