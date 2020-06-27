import {
  FETCH_ROUTES,
  CREATE_ROUTE_SUCCESS,
  CREATE_ROUTE_FAIL,
  EDIT_ROUTE_SUCCESS,
  EDIT_ROUTE_FAIL,
} from './types';

import callApi from '../utils/callApi';
import { returnErrors } from './errorAction';

export const actFetchRoutes = () => (dispatch, getState) => {
  callApi('api/routes', 'GET')
    .then((res) =>
      dispatch({
        type: FETCH_ROUTES,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const actCreateRoute = (route) => (dispatch, getState) => {
  callApi('api/routes/create', 'POST', route)
    .then((res) =>
      dispatch({
        type: CREATE_ROUTE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));

      dispatch({ type: CREATE_ROUTE_FAIL });
    });
};

export const actEditRoute = (route) => (dispatch, getState) => {
  callApi('api/routes/edit', 'POST', route)
    .then((res) =>
      dispatch({
        type: EDIT_ROUTE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));

      dispatch({ type: EDIT_ROUTE_FAIL });
    });
};
