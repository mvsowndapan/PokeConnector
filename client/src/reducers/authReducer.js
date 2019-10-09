// This file actually does all the changes into the state and store it in the store
//isempty validation is used to check the token is empty
import isEmpty from '../validation/isEmpty';
//types
import { SET_CURRENT_USER } from '../actions/types';
//Auth reducer initial state
const initialState = {
    isAuthenticated: false,
    user: {}
}

//exporting reducers cases
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        default: return state;
    }
}  