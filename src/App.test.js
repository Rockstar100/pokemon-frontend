import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation links', () => {
  render(<App />);
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Add User')).toBeInTheDocument();
  expect(screen.getByText('Add Pokémon')).toBeInTheDocument();
  expect(screen.getByText('Pokemon List')).toBeInTheDocument();
});
