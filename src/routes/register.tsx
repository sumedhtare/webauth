import React, { useState } from 'react';
import '../styles/component.scss';
import { useAuth } from '../hooks/useAuth';

type UserRegistrationFormData = {
  username: string;
  password: string;
};

const UserRegistrationPage: React.FC = () => {
  const { register } = useAuth();

  const [formData, setFormData] = useState<UserRegistrationFormData>({
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
    register(formData);
  };

  return (
    <div className="container mt50">
      <div className="center">
        <h2>User Registration</h2>
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
              Register
            </button>
          </div>
        </form>
        <a href={`/`}>already a user ? click here to login.</a>
      </div>
    </div>
  );
};

export default UserRegistrationPage;
