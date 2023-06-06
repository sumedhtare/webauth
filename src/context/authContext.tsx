import React, { createContext, useState } from 'react';
import { user as userType } from '../types/interface';

interface AuthContextProps {
  token: string | null;
  user: userType | null;
  // eslint-disable-next-line no-unused-vars
  setToken: (token: string | null) => void;
  // eslint-disable-next-line no-unused-vars
  setUser: (user: userType | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  setToken: () => {},
  setUser: () => {}
});

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<userType | null>(null);

  const handleSetToken = (newToken: string | null) => {
    setToken(newToken);
  };

  const handleSetUser = (newUser: userType | null) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser: handleSetUser, setToken: handleSetToken }}>
      {children}
    </AuthContext.Provider>
  );
};
