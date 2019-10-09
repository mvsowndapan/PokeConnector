import { combineReducers } from 'redux';
// reducers
import auth from './authReducer';
import err from './errReducer';
import profile from './profileReducer';
import post from './postReducer';

export default combineReducers({
    auth: auth,
    err: err,
    profile: profile,
    post: post
});