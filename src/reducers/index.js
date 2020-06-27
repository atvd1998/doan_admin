import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import stationReducer from './stationReducer';
import scheduleReducer from './scheduleReducer';
import routeReducer from './routeReducer';
import trainReducer from './trainReducer';
import invoiceReducer from './invoiceReducer'

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  user: userReducer,
  station: stationReducer,
  schedule: scheduleReducer,
  route: routeReducer,
  train: trainReducer,
  invoice: invoiceReducer
});
