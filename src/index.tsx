import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserLoginPage from './routes/login';
import UserRegistrationPage from './routes/register';
import HomePage from './routes/welcome';
import { AuthProvider } from './context/authContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLoginPage/>,
  },
  {
    path: "/home",
    element: <HomePage/>,
  },
  {
    path: "/register",
    element: <UserRegistrationPage/>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
