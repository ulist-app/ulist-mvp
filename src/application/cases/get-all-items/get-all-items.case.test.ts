import {ItemRepository} from "../../repositories";
import {ItemList} from "../../../domain";
import {ItemBuilder} from "../../../tests/builders";
import {GetAllItemsCase} from "./get-all-items.case";

describe('Get all items use case should', () => {
  it('return all items', async () => {
    const items = new ItemList([ItemBuilder.random(), ItemBuilder.random()])
    const itemsRepository = {
      findAll: jest.fn(async () => items)
    } as unknown as ItemRepository

    const result = await new GetAllItemsCase(itemsRepository).exec()

    expect(itemsRepository.findAll).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual(items)
  })
})
