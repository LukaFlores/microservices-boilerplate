import axios from 'axios';

export const checkIsAuthenticated = async () => {
  const response = await axios(process.env.REACT_APP_URL + '/api/users/currentUser');
  console.log(response);
  if (response.data.currentUser === null) {
    return false;
  }
  return true;
};
export const authSignUp = async (credentials: any) => {
  const response = await axios(process.env.REACT_APP_URL + '/api/users/signup', credentials);
  console.log(response);

  if (response.data === null) {
    return false;
  }
  return true;
};
export const authLogin = async (credentials: any) => {
  const response = await axios(process.env.REACT_APP_URL + '/api/users/signin', credentials);
  console.log(response);

  if (response.data === null) {
    return false;
  }
  return true;
};
export const authLogout = async () => {
  const response = await axios(process.env.REACT_APP_URL + '/api/users/signup', {});
  console.log(response);

  if (response.data === null) {
    return false;
  }
  return true;
};
