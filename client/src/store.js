//redux-store
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
//reducers
import rootReducer from "./reducers";

//state
const intialState = {};
//store
const middleware = [thunk];
// syntax :: createStore(reducer, initialState, middleware)
const store = createStore(
  rootReducer,
  intialState,
  compose(applyMiddleware(...middleware))
);
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;
