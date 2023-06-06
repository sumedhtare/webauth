import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { credentaials, tokenRes, messageRes } from '../types/interface';
import { useNavigate } from 'react-router-dom';
import { encrypt } from '../server/utils';

const serverURL: string = process.env.SERVER_URL || 'http://localhost:8000';

export const useAuth = () => {
  const { token, setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async ({ username, password }: credentaials) => {
    try {
      const res = await fetch(`${serverURL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password: encrypt(password) })
      });
      const resJson: tokenRes = await res.json();
      if (resJson.token) {
        setToken(resJson.token);
        setUser(resJson.user);
        navigate('/home');
      }
    } catch (e) {
      console.log('An error occurred', e);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`${serverURL}/api/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        }
      });
      const resJson: messageRes = await res.json();
      if (resJson.message) {
        window.location.href = '/';
      }
    } catch (e) {
      console.log('An error occurred', e);
    }
  };

  const register = async ({ username, password }: credentaials) => {
    if (token === null) {
      try {
        const res = await fetch(`${serverURL}/api/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password: encrypt(password) })
        });
        const resJson: messageRes = await res.json();
        if (resJson.message) {
          alert('Registration successful');
          window.location.href = '/';
        }
      } catch (e) {
        console.log('An error occurred', e);
      }
    } else {
      alert('Already logged in');
    }
  };

  return { login, register, logout };
};
