import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';
import callApi from '../utils/callApi';
import { returnErrors } from './errorAction';

export const actLogin = (user) => (dispatch, getState) => {
  callApi('api/users/login', 'POST', user)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));

      dispatch({ type: LOGIN_FAIL });
    });
};

export const actLogout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

export const actRegister = (user) => (dispatch, getState) => {
  callApi('api/users/register', 'POST', user)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));

      dispatch({ type: REGISTER_FAIL });
    });
};
