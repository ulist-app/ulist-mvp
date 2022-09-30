import {faker} from "@faker-js/faker";
import {Category, CategoryParams, Id} from "../../domain";

export class CategoryBuilder {

  private id: Id
  private name: string
  private color: string

  private constructor ({ id, name, color }: CategoryParams = {}) {
    this.id = id || new Id()
    this.name = name || faker.random.word()
    this.color = color || faker.color.rgb({ prefix: '#', casing: 'lower' })
  }

  static random(): Category {
    return new CategoryBuilder().build()
  }

  build(): Category {
    return new Category({
      id: this.id,
      name: this.name,
      color: this.color
    })
  }
}
