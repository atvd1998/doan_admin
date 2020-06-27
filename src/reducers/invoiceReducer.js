import {
  FETCH_INVOICES,
  FETCH_TICKETS,
  CANCEL_TICKET_SUCCESS,
  CANCEL_TICKET_FAIL,
} from '../actions/types';

const initialState = {
  invoices: [],
  ticket: [],
  isCanceled: null,
  msg: null,
};

const stations = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVOICES:
      return {
        ...state,
        invoices: action.payload,
      };
    case FETCH_TICKETS:
      return {
        ...state,
        tickets: action.payload,
      };
    case CANCEL_TICKET_SUCCESS:
      return {
        ...state,
        msg: action.payload.msg,
        isCanceled: true,
      };
    case CANCEL_TICKET_FAIL:
      return {
        ...state,
        isCanceled: false,
      };

    default:
      return state;
  }
};

export default stations;
