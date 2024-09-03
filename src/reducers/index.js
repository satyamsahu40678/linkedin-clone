import { combineReducers } from "redux";
import userReducer from "./userReducer";
import articleReducer from "./articleReducer";


//the root reducer which takes care of other reducers to call
const rootReducer = combineReducers({
    userState: userReducer,
    articleState: articleReducer,
});

export default rootReducer;