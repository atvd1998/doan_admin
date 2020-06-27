import {
  FETCH_USERS,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '../actions/types';

const initialState = {
  users: [],
  isUpdated: null,
  msg: null,
  isDeleted: null,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        msg: action.payload.msg,
        isUpdated: true,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isDeleted: true,
        msg: action.payload.msg,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        isDeleted: false,
      };
    default:
      return state;
  }
};

export default users;
