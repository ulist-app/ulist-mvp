import {ListItemProps, messages} from "./ListItem";
import {ItemBuilder} from "../../../../tests/builders/ItemBuilder";

export function buildListItemProps(item = ItemBuilder.random()): ListItemProps {
  return {
    item,
    setItemAsRequired: jest.fn(),
    setItemAsNotRequired: jest.fn(),
    setItemAsMandatory: jest.fn(),
    setItemAsNotMandatory: jest.fn(),
  }
}

export const useCases = [
  ((props) => ({
    status: 'mandatory',
    label: messages.setItemAsMandatory,
    opositeLabel: messages.setItemAsNotMandatory,
    useCase: props.setItemAsMandatory,
    props
  }))(buildListItemProps(ItemBuilder.initialize().withIsMandatory(false).build())),
  ((props) => ({
    status: 'not mandatory',
    label: messages.setItemAsNotMandatory,
    opositeLabel: messages.setItemAsMandatory,
    useCase: props.setItemAsNotMandatory,
    props
  }))(buildListItemProps(ItemBuilder.initialize().withIsMandatory(true).build())),
  ((props) => ({
    status: 'required',
    label: messages.setItemAsRequired,
    opositeLabel: messages.setItemAsNotRequired,
    useCase: props.setItemAsRequired,
    props
  }))(buildListItemProps(ItemBuilder.initialize().withIsRequired(false).build())),
  ((props) => ({
    status: 'not required',
    label: messages.setItemAsNotRequired,
    opositeLabel: messages.setItemAsRequired,
    useCase: props.setItemAsNotRequired,
    props
  }))(buildListItemProps(ItemBuilder.initialize().withIsRequired(true).build())),
];
