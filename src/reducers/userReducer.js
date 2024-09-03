import { SET_USER } from "../actions/actionType";
//state updater

const INITIAL_STATE = {
    user : null,
};

//here define the logic for setting user reducer
//action as parameter and state as INITIAL_STATE
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user,
            }

        default:
            return state;
    }
};

//exporting the user reducer to the root reducer
export default userReducer;