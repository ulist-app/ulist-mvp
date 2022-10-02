import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ListItem } from "./index";
import { ItemBuilder } from "../../../../tests/builders";
import { UseCasesBuilder } from "../../../../tests/builders/use-cases-builder";
import { initStore } from "../../store";
import { UseCaseDouble } from "../../../../tests/doubles/use-case.double";
import { messages } from "../../../../messages";

describe("List item should", () => {
  it.each([
    ((item) => ({
      attr: "name",
      label: item.name,
      item,
      useCases: UseCasesBuilder.random(),
    }))(ItemBuilder.random()),
    ((item) => ({
      attr: "quantity",
      label: item.quantity,
      item,
      useCases: UseCasesBuilder.random(),
    }))(ItemBuilder.random()),
  ])("show item $attr", ({ label, item, useCases }) => {
    render(<ListItem item={item} />);
    initStore(useCases);
    console.log("use", useCases);

    screen.getByText(label);
  });

  it.each([
    {
      status: "mandatory",
      label: messages.actions.setItemAsMandatory,
      opositeLabel: messages.actions.setItemAsNotMandatory,
      item: ItemBuilder.init().withIsMandatory(false).build(),
    },
    {
      status: "not mandatory",
      label: messages.actions.setItemAsNotMandatory,
      opositeLabel: messages.actions.setItemAsMandatory,
      item: ItemBuilder.init().withIsMandatory(true).build(),
    },
    {
      status: "required",
      label: messages.actions.setItemAsRequired,
      opositeLabel: messages.actions.setItemAsNotRequired,
      item: ItemBuilder.init().withIsRequired(false).build(),
    },
    {
      status: "not required",
      label: messages.actions.setItemAsNotRequired,
      opositeLabel: messages.actions.setItemAsRequired,
      item: ItemBuilder.init().withIsRequired(true).build(),
    },
  ])("show cta for set item as $status", ({ label, opositeLabel, item }) => {
    render(<ListItem item={item} />);

    screen.getByLabelText(label);
    expect(screen.queryByLabelText(opositeLabel)).toBeNull();
  });

  describe("set item as", () => {
    it("set item as mandatory", async () => {
      const label = messages.actions.setItemAsMandatory;
      const useCase = new UseCaseDouble();
      const useCases = UseCasesBuilder.init()
        .withSetItemAsMandatoryCase(useCase)
        .build();
      initStore(useCases);
      render(
        <ListItem item={ItemBuilder.init().withIsMandatory(false).build()} />
      );

      userEvent.click(screen.getByLabelText(label));

      useCase.assertHasBeenCalledTimes(1);
    });

    it("set item as not mandatory", async () => {
      const label = messages.actions.setItemAsNotMandatory;
      const useCase = new UseCaseDouble();
      const useCases = UseCasesBuilder.init()
        .withSetItemAsNotMandatoryCase(useCase)
        .build();
      initStore(useCases);
      render(
        <ListItem item={ItemBuilder.init().withIsMandatory(true).build()} />
      );

      userEvent.click(screen.getByLabelText(label));

      useCase.assertHasBeenCalledTimes(1);
    });

    it("set item as required", async () => {
      const label = messages.actions.setItemAsRequired;
      const useCase = new UseCaseDouble();
      const useCases = UseCasesBuilder.init()
        .withSetItemAsRequiredCase(useCase)
        .build();
      initStore(useCases);
      render(
        <ListItem item={ItemBuilder.init().withIsRequired(false).build()} />
      );

      userEvent.click(screen.getByLabelText(label));

      useCase.assertHasBeenCalledTimes(1);
    });

    it("set item as not required", async () => {
      const label = messages.actions.setItemAsNotRequired;
      const useCase = new UseCaseDouble();
      const useCases = UseCasesBuilder.init()
        .withSetItemAsNotRequiredCase(useCase)
        .build();
      initStore(useCases);
      render(
        <ListItem item={ItemBuilder.init().withIsRequired(true).build()} />
      );

      userEvent.click(screen.getByLabelText(label));

      useCase.assertHasBeenCalledTimes(1);
    });
  });
});
