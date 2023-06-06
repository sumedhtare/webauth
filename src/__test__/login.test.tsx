import React from 'react';
import { render, screen } from '@testing-library/react';
import UserLoginPage from '../routes/login';


const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('renders register link', () => {
  render(<UserLoginPage />);
  const linkElement = screen.getByText(/click here to register/i);
  expect(linkElement).toBeInTheDocument();
});
