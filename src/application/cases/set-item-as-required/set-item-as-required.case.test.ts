import {ItemRepository} from "../../repositories";
import {Item} from "../../../core";
import {SetItemAsRequiredCase} from "./set-item-as-required.case";

describe('Set item as required use case should', () => {
  it('set item isRequired property to true', async () => {
    const item = new Item({isRequired: false})
    const itemsRepository = {
      findById: jest.fn(async () => item),
      save: jest.fn()
    } as unknown as ItemRepository

    await new SetItemAsRequiredCase(itemsRepository).exec(item.id)

    expect(itemsRepository.save).toHaveBeenCalledWith({
      ...item,
      isRequired: true
    })
  })
})
