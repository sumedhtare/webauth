import React from 'react';
import { render, screen } from '@testing-library/react';
import UserLoginPage from '../routes/login';

test('renders register link', () => {
  render(<UserLoginPage />);
  const linkElement = screen.getByText(/click here to register/i);
  expect(linkElement).toBeInTheDocument();
});
