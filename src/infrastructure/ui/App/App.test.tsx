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
import {messages} from "../components/List";
import {ItemList} from "../../../domain";
import Mock = jest.Mock;

describe('Groceries list App should', () => {

  it('renders app name', () => {
      renderAndAct(<App {...buildAppProps()} />);

    screen.getByText(/Groceries list/);
  });

  it('fetch items and render them', async () => {
    const items = new ItemList(Array.from({length: 5}).map(ItemBuilder.random));
    const getAllItemsExecSpy = jest.fn(async () => items);

    renderAndAct(<App {...buildAppProps({getAllItems: getAllItemsExecSpy})} />);
    const emptyList = screen.queryByText(messages.emptyList);
    await waitForElementToBeRemoved(emptyList)

    expect(getAllItemsExecSpy).toHaveBeenCalled()
    for (const item of items.getAll()) {
      screen.getByText(item.name);
    }
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
