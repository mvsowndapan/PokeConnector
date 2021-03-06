import axios from 'axios';
//set Auth token
export const setAuthToken = token => {
    if (token) axios.defaults.headers.common['Authorization'] = token;
    else delete axios.defaults.headers.common['Authorization'];
};
export default setAuthToken;

