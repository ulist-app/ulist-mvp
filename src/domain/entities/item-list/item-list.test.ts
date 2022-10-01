import { ItemBuilder, CategoryBuilder } from "../../../tests/builders";
import { ItemList } from "./item-list";

describe("Item List should", () => {
  const items = [
    ItemBuilder.init()
      .withName("Milk")
      .withIsRequired(true)
      .withIsMandatory(false)
      .build(),
    ItemBuilder.init()
      .withName("Cookies")
      .withIsRequired(true)
      .withIsMandatory(true)
      .build(),
    ItemBuilder.init()
      .withName("Milk shake")
      .withIsRequired(false)
      .withIsMandatory(true)
      .build(),
    ItemBuilder.init().withIsRequired(false).withIsMandatory(false).build(),
  ];

  it("return all items", () => {
    expect(new ItemList(items).getAll()).toStrictEqual(items);
  });

  it("return all required items", () => {
    expect(new ItemList(items).getAllRequired()).toStrictEqual([
      items.at(0),
      items.at(1),
    ]);
  });

  it("return all required and mandatory items", () => {
    expect(new ItemList(items).getAllMandatory()).toStrictEqual([items.at(1)]);
  });

  describe("search items", () => {
    it("returning items which name includes the search content", () => {
      expect(new ItemList(items).search("milk")).toStrictEqual(
        new ItemList([items.at(0)!, items.at(2)!])
      );
    });

    it("return all items if search is empty", () => {
      expect(new ItemList(items).search("")).toStrictEqual(new ItemList(items));
    });
  });

  it("group items by category", () => {
    const categoryA = CategoryBuilder.random();
    const categoryB = CategoryBuilder.random();
    const items = [
      ItemBuilder.init().withCategory(categoryA).build(),
      ItemBuilder.init().withCategory(categoryA).build(),
      ItemBuilder.init().withCategory(categoryB).build(),
    ];

    expect(ItemList.groupItemsByCategory(items)).toStrictEqual([
      [categoryA.name, [items.at(0), items.at(1)]],
      [categoryB.name, [items.at(2)]],
    ]);
  });
});
