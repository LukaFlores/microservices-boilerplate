import axios from 'axios';

interface credentials {
  email: string;
  password: string;
}

export const checkIsAuthenticated = async () => {
  const response = await axios.get(process.env.REACT_APP_URL + '/api/users/currentUser');
  console.log(response);
  if (response.data.currentUser === null) {
    return false;
  }
  return true;
};
export const authSignUp = async (credentials: credentials) => {
  const response = await axios.post(process.env.REACT_APP_URL + '/api/users/signup', {
    email: credentials.email,
    password: credentials.password,
  });
  console.log(response);

  if (response.data === null) {
    return false;
  }
  return true;
};
export const authLogin = async (credentials: credentials) => {
  const response = await axios.post(process.env.REACT_APP_URL + '/api/users/signin', credentials);
  console.log(response);

  if (response.data === null) {
    return false;
  }
  return true;
};
export const authLogout = async () => {
  const response = await axios.post(process.env.REACT_APP_URL + '/api/users/signup', {});
  console.log(response);

  if (response.data === null) {
    return false;
  }
  return true;
};
