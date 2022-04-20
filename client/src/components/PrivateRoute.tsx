import React, { useContext, FC, Context } from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../tools/authContext';

interface AuthRequiredInterface {
  element: any;
  path: string;
}
interface credentials {
  email: string;
  password: string;
}
export type ContextInteface = {
  isAuthenticated?: any;
  isLoading?: any;
  login?(credentials: credentials): any;
  signUp?(credentials: credentials): any;
  logout?(): any;
};



