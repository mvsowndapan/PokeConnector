import axios from 'axios';
//types
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, GET_PROFILES } from './types';


//Get all the profile
export const getProfiles = () => async dispatch => {
    try {
        dispatch(setProfileLoading());
        let profiles = await axios.get('/profile/all');
        // console.log(profiles.data);
        dispatch({ type: GET_PROFILES, payload: profiles.data });
    }
    catch (err) { dispatch({ type: GET_PROFILES, payload: null }); }

}
//Getting current profile
export const getCurrentProfile = () => async dispatch => {
    try {
        dispatch(setProfileLoading());
        let profile = await axios.get('/profile');
        dispatch({ type: GET_PROFILE, payload: profile.data });
    }
    catch (err) { dispatch({ type: GET_PROFILE, payload: {} }) }
};

//Get Profile by Handle
export const getProfileByHandle = (handle) => async dispatch => {
    try {
        dispatch(setProfileLoading());
        let profile = await axios.get(`/profile/handle/${handle}`);
        dispatch({ type: GET_PROFILE, payload: profile.data });
    }
    catch (err) { dispatch({ type: GET_PROFILE, payload: null }) }
}
//create Profile
export const createProfile = (profileData, history) => async dispatch => {
    try {
        await axios.post('/profile', profileData);
        history.push('/dashboard');
    }
    catch (err) { dispatch({ type: GET_ERRORS, payload: err.response.data }) }
};
//Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}
//Clear current Profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}
//add-Experience
export const addExperience = (expData, history) => async dispatch => {
    try {
        await axios.post('/profile/experience', expData);
        history.push('/dashboard');
    }
    catch (err) { dispatch({ type: GET_ERRORS, payload: err.response.data }) }
}
//deleteExperience
export const deleteExperience = (id) => async dispatch => {
    try {
        let exp = await axios.delete(`/profile/experience/${id}`);
        dispatch({ type: GET_PROFILE, payload: exp.data });
    }
    catch (err) { dispatch({ type: GET_ERRORS, payload: err.response.data }) }
}
//education
export const addEducation = (eduData, history) => async dispatch => {
    try {
        await axios.post('/profile/education', eduData);
        history.push('/dashboard');
    }
    catch (err) { dispatch({ type: GET_ERRORS, payload: err.response.data }) }
}
//deleteEducation
export const deleteEducation = (id) => async dispatch => {
    try {
        let edu = await axios.delete(`/profile/education/${id}`);
        dispatch({ type: GET_PROFILE, payload: edu.data });
    }
    catch (err) { dispatch({ type: GET_ERRORS, payload: err.response.data }) }
}
//deleteAccount
export const deleteAccount = () => async dispatch => {
    try {
        if (window.confirm("Are You Sure ?, You can't undo this")) {
            await axios.delete('/profile');
            dispatch({ type: SET_CURRENT_USER, payload: {} });
        }
    }
    catch (err) { dispatch({ type: GET_ERRORS, payload: err.response.data }); }
};