import { Id } from '../id'
import { palette } from '../../constants'

export interface CategoryParams {
  id?: Id
  name?: string
  color?: string
}

export class Category {
  readonly id: Id
  readonly name: string
  readonly color: string

  constructor ({ id, name, color }: CategoryParams = {}) {
    this.id = id || new Id()
    this.name = name || 'No Category'
    this.color = color || palette.gray
  }
}

export const defaultCategory = new Category({id: new Id('default-category')})
