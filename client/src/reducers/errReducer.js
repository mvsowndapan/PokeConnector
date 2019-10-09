// This file actually does all the changes into the state and store it in the store

//types
import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';
//Auth reducer initial state
const initialState = {};

//exporting reducers cases
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS: return action.payload;
        case CLEAR_ERRORS: return {};
        default: return state;
    }
} 