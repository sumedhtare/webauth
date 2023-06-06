import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../routes/welcome';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('renders welcome link', () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/logout/i);
  expect(linkElement).toBeInTheDocument();
});
