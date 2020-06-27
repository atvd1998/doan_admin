import {
  FETCH_SCHEDULES,
  EDIT_SCHEDULE_SUCCESS,
  EDIT_SCHEDULE_FAIL,
  CREATE_SCHEDULE_SUCCESS,
  CREATE_SCHEDULE_FAIL,
  DELETE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_FAIL,
} from './types';
import callApi from '../utils/callApi';
import { returnErrors } from './errorAction';

export const actFetchSchedule = () => (dispatch, getState) => {
  callApi('api/schedules/', 'GET')
    .then((res) =>
      dispatch({
        type: FETCH_SCHEDULES,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const actCreateSchedule = (schedule) => (dispatch, getState) => {
  callApi('api/schedules/create', 'POST', schedule)
    .then((res) =>
      dispatch({
        type: CREATE_SCHEDULE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));

      dispatch({ type: CREATE_SCHEDULE_FAIL });
    });
};

export const actEditSchedule = (schedule) => (dispatch, getState) => {
  callApi('api/schedules/edit', 'POST', schedule)
    .then((res) =>
      dispatch({
        type: EDIT_SCHEDULE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));

      dispatch({ type: EDIT_SCHEDULE_FAIL });
    });
};

export const actDeleteSchedule = (schedule) => (dispatch, getState) => {
  callApi('api/schedules/delete', 'POST', schedule)
    .then((res) =>
      dispatch({
        type: DELETE_SCHEDULE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));

      dispatch({ type: DELETE_SCHEDULE_FAIL });
    });
};
