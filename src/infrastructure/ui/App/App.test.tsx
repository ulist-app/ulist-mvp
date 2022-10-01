import React from "react";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import {
  GetAllItemsCase,
  SetItemAsMandatoryCase,
  SetItemAsNotMandatoryCase,
  SetItemAsNotRequiredCase,
  SetItemAsRequiredCase,
} from "../../../application";
import { ItemList } from "../../../domain";
import { messages } from "../../../messages";
import { ItemBuilder } from "../../../tests/builders";
import { GetAllItemsCaseDouble } from "../../../tests/doubles";
import App, { AppProps } from "./App";

describe("Groceries list App should", () => {
  it("renders app name", () => {
    render(<App {...buildAppProps()} />);

    screen.getByText(/Groceries list/);
  });

  it("fetch items and render them", async () => {
    const items = new ItemList(
      Array.from({ length: 3 }).map(ItemBuilder.random)
    );
    const getAllItemsDouble = new GetAllItemsCaseDouble([items]);

    render(<App {...buildAppProps({ getAllItems: getAllItemsDouble })} />);
    const emptyList = screen.queryByText(messages.emptyList);
    await waitForElementToBeRemoved(emptyList);

    getAllItemsDouble.assertHasBeenCalled();
    for (const item of items.getAll()) {
      screen.getByText(item.name);
    }
  });

  it("filter items by search", async () => {
    const items = new ItemList([
      ItemBuilder.init().withName("milk").build(),
      ItemBuilder.init().withName("cookies").build(),
      ItemBuilder.init().withName("cream").build(),
    ]);
    const getAllItemsDouble = new GetAllItemsCaseDouble([items]);

    render(<App {...buildAppProps({ getAllItems: getAllItemsDouble })} />);
    const emptyList = screen.queryByText(messages.emptyList);
    await waitForElementToBeRemoved(emptyList);
    userEvent.click(screen.getByLabelText(messages.menu.searchCTA));
    userEvent.type(screen.getByLabelText(messages.search.searchInput), "m");

    screen.getByText(items.getAll().at(0)!.name);
    screen.getByText(items.getAll().at(2)!.name);
    expect(
      screen.queryByText(items.getAll().at(1)!.name)
    ).not.toBeInTheDocument();
  });

  it("set item to buy and render it updated", async () => {
    const items = new ItemList([
      ItemBuilder.init().withName("milk").withIsRequired(false).build(),
      ItemBuilder.init().withName("cookies").build(),
      ItemBuilder.init().withName("cream").build(),
    ]);
    const itemsUpdated = new ItemList([
      ItemBuilder.clone(items.getAll().at(0)!).withIsRequired(true).build(),
      ItemBuilder.clone(items.getAll().at(1)!).build(),
      ItemBuilder.clone(items.getAll().at(2)!).build(),
    ]);
    const [item] = items.getAll();
    const getAllItemsDouble = new GetAllItemsCaseDouble([items, itemsUpdated]);
    const props = buildAppProps({ getAllItems: getAllItemsDouble });

    render(<App {...props} />);
    await waitForElementToBeRemoved(screen.queryByText(messages.emptyList));

    const firstItem = screen.getByTestId(item.id.value);
    userEvent.click(
      within(firstItem).getByLabelText(messages.actions.setItemAsRequired)
    );

    expect(props.setItemAsRequired.exec).toHaveBeenCalledTimes(1);
    await waitFor(() => getAllItemsDouble.assertHasBeenCalledTimes(2));
    const firstItemUpdated = screen.getByTestId(item.id.value);
    expect(
      within(firstItemUpdated).queryByLabelText(
        messages.actions.setItemAsRequired
      )
    ).toBeNull();
  });

  it("set item mandatory to buy and render it updated", async () => {
    const items = new ItemList([
      ItemBuilder.init().withName("milk").withIsMandatory(false).build(),
      ItemBuilder.init().withName("cookies").build(),
      ItemBuilder.init().withName("cream").build(),
    ]);
    const itemsUpdated = new ItemList([
      ItemBuilder.clone(items.getAll().at(0)!).withIsMandatory(true).build(),
      ItemBuilder.clone(items.getAll().at(1)!).build(),
      ItemBuilder.clone(items.getAll().at(2)!).build(),
    ]);
    const [item] = items.getAll();
    const getAllItemsDouble = new GetAllItemsCaseDouble([items, itemsUpdated]);
    const props = buildAppProps({ getAllItems: getAllItemsDouble });

    render(<App {...props} />);
    await waitForElementToBeRemoved(screen.queryByText(messages.emptyList));
    const firstItem = screen.getByTestId(item.id.value);
    userEvent.click(
      within(firstItem).getByLabelText(messages.actions.setItemAsMandatory)
    );

    expect(props.setItemAsMandatory.exec).toHaveBeenCalledTimes(1);
    await waitFor(() => getAllItemsDouble.assertHasBeenCalledTimes(2));
    const firstItemUpdated = screen.getByTestId(item.id.value);
    expect(
      within(firstItemUpdated).queryByLabelText(
        messages.actions.setItemAsMandatory
      )
    ).toBeNull();
  });

  it("navigate to buy list", async () => {
    const items = new ItemList([
      ItemBuilder.init().withName("milk").withIsRequired(true).build(),
      ItemBuilder.init().withName("cookies").withIsRequired(false).build(),
      ItemBuilder.init().withName("cream").withIsRequired(false).build(),
    ]);
    const getAllItemsDouble = new GetAllItemsCaseDouble([items]);
    const props = buildAppProps({ getAllItems: getAllItemsDouble });

    render(<App {...props} />);
    await waitForElementToBeRemoved(screen.queryByText(messages.emptyList));
    userEvent.click(screen.getByLabelText(messages.menu.requiredListCTA));

    screen.getByText(items.getAll().at(0)!.name);
    expect(
      screen.queryByText(items.getAll().at(1)!.name)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(items.getAll().at(2)!.name)
    ).not.toBeInTheDocument();
  });

  it("navigate to mandatory buy list", async () => {
    const items = new ItemList([
      ItemBuilder.init()
        .withName("milk")
        .withIsRequired(true)
        .withIsMandatory(false)
        .build(),
      ItemBuilder.init()
        .withName("cookies")
        .withIsRequired(true)
        .withIsMandatory(true)
        .build(),
      ItemBuilder.init().withName("cream").withIsRequired(false).build(),
    ]);
    const getAllItemsDouble = new GetAllItemsCaseDouble([items]);
    const props = buildAppProps({ getAllItems: getAllItemsDouble });

    render(<App {...props} />);
    await waitForElementToBeRemoved(screen.queryByText(messages.emptyList));
    userEvent.click(screen.getByLabelText(messages.menu.mandatoryListCTA));

    screen.getByText(items.getAll().at(1)!.name);
    expect(
      screen.queryByText(items.getAll().at(0)!.name)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(items.getAll().at(2)!.name)
    ).not.toBeInTheDocument();
  });
});

function buildAppProps({
  getAllItems,
  setItemAsRequired,
  setItemAsNotRequired,
  setItemAsMandatory,
  setItemAsNotMandatory,
}: Partial<Record<keyof AppProps, { exec: Function }>> = {}): AppProps {
  return {
    getAllItems: (getAllItems ||
      new GetAllItemsCaseDouble()) as unknown as GetAllItemsCase,
    setItemAsRequired: {
      exec: setItemAsRequired || jest.fn(async () => {}),
    } as unknown as SetItemAsRequiredCase,
    setItemAsNotRequired: {
      exec: setItemAsNotRequired || jest.fn(async () => {}),
    } as unknown as SetItemAsNotRequiredCase,
    setItemAsMandatory: {
      exec: setItemAsMandatory || jest.fn(async () => {}),
    } as unknown as SetItemAsMandatoryCase,
    setItemAsNotMandatory: {
      exec: setItemAsNotMandatory || jest.fn(async () => {}),
    } as unknown as SetItemAsNotMandatoryCase,
  };
}
