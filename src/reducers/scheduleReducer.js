import {
  FETCH_SCHEDULES,
  CREATE_SCHEDULE_SUCCESS,
  CREATE_SCHEDULE_FAIL,
  EDIT_SCHEDULE_SUCCESS,
  EDIT_SCHEDULE_FAIL,
  DELETE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_FAIL,
} from '../actions/types';

const initialState = {
  schedules: [],
  msg: null,
  isEdited: null,
  isCreated: null,
  isDeleted: null,
};

const schedules = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCHEDULES:
      return {
        ...state,
        schedules: action.payload,
      };
    case CREATE_SCHEDULE_SUCCESS:
      return {
        ...state,
        msg: action.payload.msg,
        isCreated: true,
      };
    case CREATE_SCHEDULE_FAIL:
      return {
        ...state,
        isCreated: false,
      };
    case EDIT_SCHEDULE_SUCCESS:
      return {
        ...state,
        msg: action.payload.msg,
        isEdited: true,
      };
    case EDIT_SCHEDULE_FAIL:
      return {
        ...state,
        isEdited: false,
      };
    case DELETE_SCHEDULE_SUCCESS:
      return {
        ...state,
        isDeleted: true,
        msg: action.payload.msg,
      };
    case DELETE_SCHEDULE_FAIL:
      return {
        ...state,
        isDeleted: false,
      };
    default:
      return state;
  }
};

export default schedules;
