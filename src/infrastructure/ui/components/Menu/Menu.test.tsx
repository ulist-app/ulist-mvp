import {Menu, MenuProps, messages, Views} from "./Menu";
import {render, screen} from "@testing-library/react";
import {messages as searchMessages} from '../Search'
import userEvent from "@testing-library/user-event";

describe('Menu should', () => {
  it.each([
    {action: 'go to all items list', label: messages.allItemsListCTA},
    {action: 'go to buy list', label: messages.requiredListCTA},
    {action: 'go to mandatory buy list', label: messages.mandatoryListCTA},
    {action: 'enable search', label: messages.searchCTA},
  ])('show an option for $action', ({label}) => {
    const props = buildMenuProps()
    render(<Menu {...props}/>)

    screen.getByLabelText(label)
  });
  it.each([
    {action: 'send user to all items list', label: messages.allItemsListCTA, expectedView: Views.All},
    {action: 'send user to buy list', label: messages.requiredListCTA, expectedView: Views.Required},
    {action: 'send user to mandatory buy list', label: messages.mandatoryListCTA, expectedView: Views.Mandatory},
  ])('$action', ({label, expectedView}) => {
    const props = buildMenuProps()
    render(<Menu {...props}/>)

    userEvent.click(screen.getByLabelText(label))

    expect(props.setView).toHaveBeenCalledWith(expectedView)
  });

  it('not show search bar if search is not enabled', () => {
    const props = buildMenuProps()
    render(<Menu {...props}/>)

    expect(screen.queryByLabelText(searchMessages.searchInput)).toBeNull()
  })

  it('search items if search is enabled', () => {
    const props = buildMenuProps()
    render(<Menu {...props}/>)

    userEvent.click(screen.getByLabelText(messages.searchCTA))

   screen.getByLabelText(searchMessages.searchInput)
  })
});

function buildMenuProps(activeView = Views.All): MenuProps {
  return {
    activeView,
    onSearch: jest.fn(),
    setView: jest.fn(),
  }
}
