import React from 'react';
import { render, screen } from '@testing-library/react';
import UserRegistrationPage from '../routes/register';

test('renders login link', () => {
  render(<UserRegistrationPage />);
  const linkElement = screen.getByText(/click here to login/i);
  expect(linkElement).toBeInTheDocument();
});
