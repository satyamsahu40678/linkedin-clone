import { createStore, applyMiddleware } from "redux";
// import thunkMiddleware from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "../reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;