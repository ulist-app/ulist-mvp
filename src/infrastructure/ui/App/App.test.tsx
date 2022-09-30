import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {
  GetAllItemsCase,
  SetItemAsMandatoryCase,
  SetItemAsNotMandatoryCase, SetItemAsNotRequiredCase,
  SetItemAsRequiredCase
} from "../../../application";

it('renders app name', () => {
    render(<App {...{
      getAllItems: {exec: jest.fn(async () => {})} as unknown as GetAllItemsCase,
      setItemAsRequired: {exec: jest.fn(async () => {})} as unknown as SetItemAsRequiredCase,
      setItemAsNotRequired: {exec: jest.fn(async () => {})} as unknown as SetItemAsNotRequiredCase,
      setItemAsMandatory: {exec: jest.fn(async () => {})} as unknown as SetItemAsMandatoryCase,
      setItemAsNotMandatory: {exec: jest.fn(async () => {})} as unknown as SetItemAsNotMandatoryCase,
    }} />);

  screen.getByText(/Groceries list/);
});
