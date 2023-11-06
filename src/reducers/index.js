import { combineReducers } from 'redux';
import authReducer from './authReducer';
import quizzesReducer from '../reducers/quizzesReducers';
import roomReducer from './roomReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  quizzes: quizzesReducer,
  room: roomReducer

});

export default rootReducer;

