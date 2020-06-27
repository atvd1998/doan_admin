import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  msg: null,
  status: null,
  id: null,
};

const errors = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return {
        msg: null,
        status: null,
        id: null,
      };
    default:
      return state;
  }
};
export default errors;
