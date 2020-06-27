import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions/types';

const initialState = {
  isAuthenticated: null,
  user: null,
  msg: null,
  isRegistered: null,
};

const auths = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        msg: action.payload.msg,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        msg: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegistered: true,
        msg: action.payload.msg,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isRegistered: false,
      };

    default:
      return state;
  }
};

export default auths;
