import React, { useContext, FC, Context } from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../tools/authContext';

interface PrivateRouteInterface {
  component: React.ComponentType;
  path: string;
}
export type ContextInteface = {
  isAuthenticated?: any;
  isLoading?: any;
  login?(credentials: any): Promise<void>;
  logout?(): any;
  signUp?(credentials: any): Promise<void>;
};

const PrivateRoute: FC<PrivateRouteInterface> = ({ component: Component, path }) => {
  const { isAuthenticated, isLoading } = useContext<ContextInteface>(AuthContext);

  return (
    <Route
      path={path}
      element={
        !isLoading ? (
          isAuthenticated ? (
            <Component />
          ) : (
            <Navigate to="/signin" />
          )
        ) : (
          <div>loading</div>
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
