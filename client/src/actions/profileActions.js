import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
} from './types';

// Get current profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      }),
    );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

// Create Profile
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post('/api/profile', profileData)
    .then((res) => history.push('/dashboard'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// Add Experience to Profile
export const addExperience = (expData, history) => (dispatch) => {
  axios
    .post('/api/profile/experience', expData)
    .then((res) => history.push('/dashboard'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// Add Education to Profile
export const addEducation = (eduData, history) => (dispatch) => {
  axios
    .post('/api/profile/education', eduData)
    .then((res) => history.push('/dashboard'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// Delete Experience from Profile
export const deleteExperience = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};
// Delete Education from Profile
export const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// Get All Profiles
export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then((res) =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILES,
        payload: null,
      }),
    );
};

// Get Profile by Handle
export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: null,
      }),
    );
};

// Delete Profile and User
export const deleteAccount = () => (dispatch) => {
  if (window.confirm('Вы уверены, что хотите удалить текущего пользователя?')) {
    axios
      .delete('api/profile')
      .then((res) => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  }
};
