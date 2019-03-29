import axios from 'axios';
import { GET_ERROR, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register user
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/users/register', userData)
    .then(() => {
      history.push('/login');
    })
    .catch((err) => {
      dispatch({
        type: GET_ERROR,
        payload: err.response.data,
      });
    });
};

// Login user
export const loginUser = (userData) => (dispatch) => {
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      // Get token
      const { token } = res.data;
      // Save token to localStorage
      localStorage.setItem('jwtToken', token);
      // Set token to auth header
      setAuthToken(token);
      // Get user from decoded token
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERROR,
        payload: err.response.data,
      });
    });
};

// Set current user func
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Logout user
export const logoutUser = () => (dispatch) => {
  // Delete token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove headers for future requests
  setAuthToken(false);
  // Set current user to {}
  dispatch(setCurrentUser({}));
};
