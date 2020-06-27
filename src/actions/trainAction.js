import { FETCH_TRAINS } from './types';
import callApi from '../utils/callApi';
import { returnErrors } from './errorAction';

export const actFetchTrains = () => (dispatch, getState) => {
  callApi('api/trains/info', 'GET')
    .then((res) =>
      dispatch({
        type: FETCH_TRAINS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
