import { FETCH_STATIONS } from './types';
import callApi from '../utils/callApi';
import { returnErrors } from './errorAction';

export const actFetchStations = () => (dispatch, getState) => {
  callApi('api/stations', 'GET')
    .then((res) =>
      dispatch({
        type: FETCH_STATIONS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
