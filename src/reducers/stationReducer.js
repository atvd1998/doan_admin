import { FETCH_STATIONS } from '../actions/types';

const initialState = {
  stations: [],
  msg: null,
};

const stations = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATIONS:
      return {
        ...state,
        stations: action.payload,
      };

    default:
      return state;
  }
};

export default stations;
