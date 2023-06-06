import React, { useState } from 'react';
import '../styles/component.scss';
import { useAuth } from '../hooks/useAuth';

type UserLoginPageFormData = {
  username: string;
  password: string;
};

const UserLoginPage: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<UserLoginPageFormData>({
    username: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="container mt50">
      <div className="center">
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="box">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="box">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="box container">
            <button className="button" type="submit">
              Login
            </button>
          </div>
        </form>
        <a href={`/register`}>not a user ? click here to register.</a>
      </div>
    </div>
  );
};

export default UserLoginPage;
