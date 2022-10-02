import { ItemList } from "../../../../domain";
import { ItemBuilder } from "../../../../tests/builders";
import { GetAllItemsCaseDouble } from "../../../../tests/doubles";
import { render, screen, waitFor, within } from "@testing-library/react";
import { UseCasesBuilder } from "../../../../tests/builders/use-cases-builder";
import userEvent from "@testing-library/user-event";
import { messages } from "../../../../messages";
import React from "react";
import { Groceries } from "./Groceries";
import { initStore } from "../../store";
import { UseCaseDouble } from "../../../../tests/doubles/use-case.double";

describe("Groceries view should", () => {
  it("fetch items and render them", async () => {
    const items = new ItemList(
      Array.from({ length: 3 }).map(ItemBuilder.random)
    );
    const getAllItemsDouble = new GetAllItemsCaseDouble([items]);

    render(<Groceries />);
    initStore(
      UseCasesBuilder.init().withGetAllItemsCase(getAllItemsDouble).build()
    );

    await waitFor(() => getAllItemsDouble.assertHasBeenCalled());
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

    render(<Groceries />);
    initStore(
      UseCasesBuilder.init().withGetAllItemsCase(getAllItemsDouble).build()
    );
    userEvent.click(screen.getByLabelText(messages.menu.searchCTA));
    userEvent.type(screen.getByLabelText(messages.search.searchInput), "m");

    await waitFor(() => {
      screen.getByText(items.getAll().at(0)!.name);
      screen.getByText(items.getAll().at(2)!.name);
      expect(
        screen.queryByText(items.getAll().at(1)!.name)
      ).not.toBeInTheDocument();
    });
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
    const setItemAsRequired = new UseCaseDouble();
    const useCases = UseCasesBuilder.init()
      .withGetAllItemsCase(getAllItemsDouble)
      .withSetItemAsRequiredCase(setItemAsRequired)
      .build();
    initStore(useCases);
    render(<Groceries />);

    await waitFor(() => {
      screen.getByTestId(item.id.value);
    });
    userEvent.click(
      within(screen.getByTestId(item.id.value)).getByLabelText(
        messages.actions.setItemAsRequired
      )
    );

    setItemAsRequired.assertHasBeenCalledTimes(1);
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
    const setItemAsMandatoryDouble = new UseCaseDouble();
    const useCases = UseCasesBuilder.init()
      .withGetAllItemsCase(getAllItemsDouble)
      .withSetItemAsMandatoryCase(setItemAsMandatoryDouble)
      .build();

    initStore(useCases);
    render(<Groceries />);
    await waitFor(() => {
      screen.getByTestId(item.id.value);
    });
    userEvent.click(
      within(screen.getByTestId(item.id.value)).getByLabelText(
        messages.actions.setItemAsMandatory
      )
    );

    setItemAsMandatoryDouble.assertHasBeenCalledTimes(1);
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
    initStore(
      UseCasesBuilder.init().withGetAllItemsCase(getAllItemsDouble).build()
    );
    render(<Groceries />);
    await waitFor(() => {
      screen.getByLabelText(messages.menu.requiredListCTA);
    });

    userEvent.click(screen.getByLabelText(messages.menu.requiredListCTA));

    await waitFor(() => {
      screen.getByText(items.getAll().at(0)!.name);
      expect(
        screen.queryByText(items.getAll().at(2)!.name)
      ).not.toBeInTheDocument();
    });
    expect(
      screen.queryByText(items.getAll().at(1)!.name)
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
    initStore(
      UseCasesBuilder.init().withGetAllItemsCase(getAllItemsDouble).build()
    );
    render(<Groceries />);
    await waitFor(() => {
      screen.getByLabelText(messages.menu.mandatoryListCTA);
    });

    userEvent.click(screen.getByLabelText(messages.menu.mandatoryListCTA));

    await waitFor(() => {
      screen.getByText(items.getAll().at(1)!.name);
      expect(
        screen.queryByText(items.getAll().at(2)!.name)
      ).not.toBeInTheDocument();
    });
    expect(
      screen.queryByText(items.getAll().at(0)!.name)
    ).not.toBeInTheDocument();
  });
});
