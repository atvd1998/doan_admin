import {
  FETCH_INVOICES,
  FETCH_TICKETS,
  CANCEL_TICKET_FAIL,
  CANCEL_TICKET_SUCCESS,
} from './types';
import callApi from '../utils/callApi';
import { returnErrors } from './errorAction';

export const actFetchInvoices = () => (dispatch, getState) => {
  callApi('api/invoices', 'GET')
    .then((res) =>
      dispatch({
        type: FETCH_INVOICES,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const actFetchTicket = () => (dispatch, getState) => {
  callApi('api/invoices/tickets', 'GET')
    .then((res) =>
      dispatch({
        type: FETCH_TICKETS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const actCancelTicket = (ticket) => (dispatch, getState) => {
  callApi('api/invoices/cancelticket', 'POST', ticket)
    .then((res) =>
      dispatch({
        type: CANCEL_TICKET_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));

      dispatch({ type: CANCEL_TICKET_FAIL });
    });
};
