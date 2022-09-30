import {render, screen} from "@testing-library/react";
import {ItemBuilder} from "../../../../tests/builders";
import {messages} from "../../../../messages";
import {List, ListProps} from "./List";

describe('List should', () => {
  it('show a list of items separated by categories', () => {
    const props = buildListProps()
    render(<List {...props}/>)

    props.items.forEach(item => {
      screen.getByText(item.name)
      screen.getByText(item.category.name)
    })
  });
  it('show a message if there is no items to show', () => {
    const props = buildListProps([])
    render(<List {...props}/>)

    screen.getByText(messages.emptyList)
  });
});

export function buildListProps(items = Array(3).map(ItemBuilder.random)): ListProps {
  return {
    items,
    setItemAsRequired: jest.fn(),
    setItemAsNotRequired: jest.fn(),
    setItemAsMandatory: jest.fn(),
    setItemAsNotMandatory: jest.fn(),
  }
}
