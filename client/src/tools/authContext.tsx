import React, { useState, useEffect, FC } from 'react';
import PropTypes from 'prop-types';
import { checkIsAuthenticated, authSignUp, authLogin, authLogout } from '../services/auth';
import { ContextInteface } from '../components/PrivateRoute';

export const AuthContext = React.createContext<ContextInteface>({});

interface Props {
  children: any;
}

export const Auth: FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () =>
    checkIsAuthenticated()
      .then((res) => setIsAuthenticated(res))
      .then(() => setIsLoading(false));

  const login = (credentials: any) =>
    authLogin(credentials)
      .then((res) => setIsAuthenticated(res))
      .then(() => setIsLoading(false));

  const logout = () => {
    authLogout();
    setIsAuthenticated(false);
  };

  const signUp = (credentials: any) =>
    authSignUp(credentials)
      .then((res) => setIsAuthenticated(res))
      .then(() => setIsLoading(false));

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

Auth.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
};
