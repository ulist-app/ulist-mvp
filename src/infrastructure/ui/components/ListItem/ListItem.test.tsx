import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ListItem } from "./index";
import { buildListItemProps, useCases } from "./testHelper";

describe("List item should", () => {
  it.each([
    ((props) => ({ attr: "name", label: props.item.name, props }))(
      buildListItemProps()
    ),
    ((props) => ({ attr: "quantity", label: props.item.quantity, props }))(
      buildListItemProps()
    ),
  ])("show item $attr", ({ label, props }) => {
    render(<ListItem {...props} />);

    screen.getByText(label);
  });

  it.each(useCases)(
    "show cta for set item as $status",
    ({ label, opositeLabel, props }) => {
      render(<ListItem {...props} />);

      screen.getByLabelText(label);
      expect(screen.queryByLabelText(opositeLabel)).toBeNull();
    }
  );

  it.each(useCases)("set item as $status", ({ props, label, useCase }) => {
    render(<ListItem {...props} />);

    userEvent.click(screen.getByLabelText(label));

    expect(useCase).toHaveBeenCalledTimes(1);
  });
});
