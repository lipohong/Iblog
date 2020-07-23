import { combineReducers } from 'redux';
import global from './globalReducer';
import auth from './authReducer';
import blog from './blogReducer';

export default combineReducers({
  global,
  auth
})
