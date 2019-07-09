// This file contain all the ajax calls and dispatch the reponse how ever we like !!!
// u need type file for representing which case u are going to call
import axios from 'axios';
//types
import { GET_ERRORS, SET_CURRENT_USER } from './types';
//utils (set the token to avery private request)
import { setAuthToken } from '../utils/setAuthToken';
//jwt-decode (token contain all the  user info  to decode that we need)
import jwt_decode from 'jwt-decode';

//Register
export const registerUser = (userDate, history) => async dispatch => {
    try {
        await axios.post('/user/register', userDate);
        history.push('/login');
    }
    catch (err) { dispatch({ type: GET_ERRORS, payload: err.response.data }) }
};

//Login
export const loginUser = (userData) => async dispatch => {
    try {
        let user = await axios.post('/user/login', userData);
        const { token } = user.data;
        localStorage.setItem('jwtToken', token); //save token to local storage
        setAuthToken(token); //set token to auth header
        let decoded = jwt_decode(token); //decoding token to get the user data
        dispatch(setCurrentUser(decoded));// dispatch the login form 
    }
    catch (err) { dispatch({ type: GET_ERRORS, payload: err.response.data }) }
}
//setting current user to the state
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }; 
}
//logout the user and delete the token
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');//remove token from localstorage
    setAuthToken(false); //remove auth token
    dispatch(setCurrentUser({})); //set user state to {} and to change isAuthenticated to false
}
