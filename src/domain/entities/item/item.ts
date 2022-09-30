import { Id } from '../id'
import {Category, defaultCategory} from "../category";

export interface ItemParams {
  id?: Id
  name?: string
  category?: Category
  isRequired?: boolean
  isMandatory?: boolean
  quantity?: number
}

export class Item {
  readonly id: Id
  readonly category: Category
  readonly name: string
  readonly isRequired: boolean
  readonly isMandatory: boolean
  readonly quantity: number

  constructor ({ id, name, category, isRequired, isMandatory, quantity }: ItemParams = {}) {
    this.id = id || new Id()
    this.name = name || 'Untitled'
    this.category = category || defaultCategory
    this.isRequired = isRequired ?? false
    this.isMandatory = isMandatory ?? false
    this.quantity = quantity ?? 1
  }
}
