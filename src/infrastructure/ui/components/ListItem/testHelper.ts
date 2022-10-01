import { ListItemProps } from "./ListItem";
import { messages } from "../../../../messages";
import { ItemBuilder } from "../../../../tests/builders";

export function buildListItemProps(item = ItemBuilder.random()): ListItemProps {
  return {
    item,
    setItemAsRequired: jest.fn(),
    setItemAsNotRequired: jest.fn(),
    setItemAsMandatory: jest.fn(),
    setItemAsNotMandatory: jest.fn(),
  };
}

export const useCases = [
  ((props) => ({
    status: "mandatory",
    label: messages.actions.setItemAsMandatory,
    opositeLabel: messages.actions.setItemAsNotMandatory,
    useCase: props.setItemAsMandatory,
    props,
  }))(buildListItemProps(ItemBuilder.init().withIsMandatory(false).build())),
  ((props) => ({
    status: "not mandatory",
    label: messages.actions.setItemAsNotMandatory,
    opositeLabel: messages.actions.setItemAsMandatory,
    useCase: props.setItemAsNotMandatory,
    props,
  }))(buildListItemProps(ItemBuilder.init().withIsMandatory(true).build())),
  ((props) => ({
    status: "required",
    label: messages.actions.setItemAsRequired,
    opositeLabel: messages.actions.setItemAsNotRequired,
    useCase: props.setItemAsRequired,
    props,
  }))(buildListItemProps(ItemBuilder.init().withIsRequired(false).build())),
  ((props) => ({
    status: "not required",
    label: messages.actions.setItemAsNotRequired,
    opositeLabel: messages.actions.setItemAsRequired,
    useCase: props.setItemAsNotRequired,
    props,
  }))(buildListItemProps(ItemBuilder.init().withIsRequired(true).build())),
];
