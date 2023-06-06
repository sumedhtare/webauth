import React from 'react';
import { render, screen } from '@testing-library/react';
import UserRegistrationPage from '../routes/register';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

test('renders login link', () => {
  render(<UserRegistrationPage />);
  const linkElement = screen.getByText(/click here to login/i);
  expect(linkElement).toBeInTheDocument();
});
