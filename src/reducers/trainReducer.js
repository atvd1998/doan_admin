import { FETCH_TRAINS } from '../actions/types';

const initialState = {
  trains: [],
  msg: null,
};

const trains = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRAINS:
      return {
        ...state,
        trains: action.payload,
      };

    default:
      return state;
  }
};

export default trains;
