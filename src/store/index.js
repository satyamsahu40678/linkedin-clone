import { createStore, applyMiddleware } from "redux";
// import thunkMiddleware from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "../reducers";

//creating the redux store and applying middleware for asynchronous actions
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;