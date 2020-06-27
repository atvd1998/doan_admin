import {
  FETCH_USERS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from './types';
import callApi from '../utils/callApi';
import { returnErrors } from './errorAction';

export const actFetchUsers = () => (dispatch, getState) => {
  callApi('api/users', 'GET')
    .then((res) =>
      dispatch({
        type: FETCH_USERS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
export const actUpdateUser = (user) => (dispatch, getState) => {
  callApi('api/users/update', 'POST', user)
    .then((res) =>
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));

      dispatch({ type: UPDATE_USER_FAIL });
    });
};

export const actDeleteUser = (user) => (dispatch, getState) => {
  callApi('api/users/delete', 'POST', user)
    .then((res) =>
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));

      dispatch({ type: DELETE_USER_FAIL });
    });
};
