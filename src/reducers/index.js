import { combineReducers } from 'redux';
import authReducer from './authReducer';
// import tokenRefreshReducer from './tokenRefreshReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // tokenRefresh: tokenRefreshReducer,
});

export default rootReducer;