import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

xtest('renders app name', () => {
  render(<App />);
  const groceries = screen.getByText(/Groceries list/);
  expect(groceries).toBeInTheDocument();
});
