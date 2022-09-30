import {faker} from "@faker-js/faker";
import {Category, Id, Item, ItemParams} from "../../domain";
import {CategoryBuilder} from "./CategoryBuilder";

export class ItemBuilder {
  private id: Id
  private category: Category
  private name: string
  private isRequired: boolean
  private isMandatory: boolean
  private quantity: number
  private constructor ({ id, name, category, isRequired, isMandatory, quantity }: ItemParams = {}) {
    this.id = id || new Id();
    this.name = name || faker.random.words()
    this.category = category || CategoryBuilder.random()
    this.isRequired = isRequired ?? faker.datatype.boolean()
    this.isMandatory = isMandatory ?? faker.datatype.boolean()
    this.quantity = quantity ?? 1
  }

  static init(): ItemBuilder {
    return new ItemBuilder()
  }

  withName(name: string): ItemBuilder {
    this.name = name
    return this
  }

  withCategory(category: Category): ItemBuilder {
    this.category = category
    return this
  }

  withIsMandatory(isMandatory: boolean): ItemBuilder {
    this.isMandatory = isMandatory
    return this
  }

  withIsRequired(isRequired: boolean): ItemBuilder {
    this.isRequired = isRequired
    return this
  }

  static random(): Item {
    return new ItemBuilder().build()
  }

  build(): Item {
    return new Item({
      id: this.id,
      name: this.name,
      category: this.category,
      isRequired: this.isRequired,
      isMandatory: this.isMandatory,
      quantity: this.quantity,
    })
  }

}
