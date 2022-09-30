import React, {ReactElement} from 'react';
import {act, render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import App, {AppProps} from './App';
import {
  GetAllItemsCase,
  SetItemAsMandatoryCase,
  SetItemAsNotMandatoryCase,
  SetItemAsNotRequiredCase,
  SetItemAsRequiredCase
} from "../../../application";
import {ItemBuilder} from "../../../tests/builders/ItemBuilder";
import {ItemList} from "../../../domain";
import Mock = jest.Mock;
import userEvent from "@testing-library/user-event";
import {messages} from "../../../messages";

describe('Groceries list App should', () => {

  it('renders app name', () => {
      renderAndAct(<App {...buildAppProps()} />);

    screen.getByText(/Groceries list/);
  });

  it('fetch items and render them', async () => {
    const items = new ItemList(Array.from({length: 3}).map(ItemBuilder.random));
    const getAllItemsExecSpy = jest.fn(async () => items);

    renderAndAct(<App {...buildAppProps({getAllItems: getAllItemsExecSpy})} />);
    const emptyList = screen.queryByText(messages.emptyList);
    await waitForElementToBeRemoved(emptyList)

    expect(getAllItemsExecSpy).toHaveBeenCalled()
    for (const item of items.getAll()) {
      screen.getByText(item.name);
    }
  });

  it('filter items by search', async () => {
    const items = new ItemList([
      ItemBuilder.init().withName('milk').build(),
      ItemBuilder.init().withName('cookies').build(),
      ItemBuilder.init().withName('cream').build(),
    ]);
    const getAllItemsExecSpy = jest.fn(async () => items);

    renderAndAct(<App {...buildAppProps({getAllItems: getAllItemsExecSpy})} />);
    const emptyList = screen.queryByText(messages.emptyList);
    await waitForElementToBeRemoved(emptyList)
    userEvent.click(screen.getByLabelText(messages.menu.searchCTA))
    userEvent.type(screen.getByLabelText(messages.search.searchInput), 'm')

      screen.getByText(items.getAll().at(0)!.name);
      screen.getByText(items.getAll().at(2)!.name);
  });
});


function buildAppProps({
                         getAllItems,
                         setItemAsRequired,
                         setItemAsNotRequired,
                         setItemAsMandatory,
                         setItemAsNotMandatory,
                       }: Partial<Record<keyof AppProps, Mock>> = {}): AppProps {
  return {
    getAllItems: {
      exec: getAllItems || jest.fn(async () => {
      })
    } as unknown as GetAllItemsCase,
    setItemAsRequired: {
      exec: setItemAsRequired || jest.fn(async () => {
      })
    } as unknown as SetItemAsRequiredCase,
    setItemAsNotRequired: {
      exec: setItemAsNotRequired || jest.fn(async () => {
      })
    } as unknown as SetItemAsNotRequiredCase,
    setItemAsMandatory: {
      exec: setItemAsMandatory || jest.fn(async () => {
      })
    } as unknown as SetItemAsMandatoryCase,
    setItemAsNotMandatory: {
      exec: setItemAsNotMandatory || jest.fn(async () => {
      })
    } as unknown as SetItemAsNotMandatoryCase,
  }
}

function renderAndAct(component: ReactElement) {
  act(() => {
    render(component)
  })
}
