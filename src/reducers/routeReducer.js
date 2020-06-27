import {
  FETCH_ROUTES,
  CREATE_ROUTE_SUCCESS,
  CREATE_ROUTE_FAIL,
  EDIT_ROUTE_SUCCESS,
  EDIT_ROUTE_FAIL,
} from '../actions/types';

const initialState = {
  routes: [],
  msg: null,
  isEdited: null,
  isCreated: null,
};

const schedules = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ROUTE_SUCCESS:
      return {
        ...state,
        msg: action.payload.msg,
        isCreated: true,
      };
    case CREATE_ROUTE_FAIL:
      return {
        ...state,
        isCreated: false,
      };
    case FETCH_ROUTES:
      return {
        ...state,
        routes: action.payload,
      };
    case EDIT_ROUTE_SUCCESS:
      return {
        ...state,
        isEdited: true,
        msg: action.payload.msg,
      };
    case EDIT_ROUTE_FAIL:
      return {
        ...state,
        isEdited: false,
      };

    default:
      return state;
  }
};

export default schedules;
