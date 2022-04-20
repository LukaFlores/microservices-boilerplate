import React, { useState, useEffect, FC } from 'react';
import PropTypes from 'prop-types';
import { checkIsAuthenticated, authSignUp, authLogin, authLogout } from '../services/auth';
import { ContextInteface } from '../components/PrivateRoute';

export const AuthContext = React.createContext<ContextInteface>({});

interface Props {
  children: any;
}

interface credentials {
  email: string;
  password: string;
}

export const Auth: FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const res = await checkIsAuthenticated();
    if (res) {
      setIsAuthenticated(res);
      setIsLoading(false);
    }
  };

  const login = (credentials: credentials) => {
    authLogin(credentials)
      .then((res) => setIsAuthenticated(res))
      .then(() => setIsLoading(false));
  };

  const logout = () => {
    authLogout();
    setIsAuthenticated(false);
  };

  const signUp = (credentials: credentials) => {
    authSignUp(credentials).then((res) => setIsAuthenticated(res));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

Auth.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
};
