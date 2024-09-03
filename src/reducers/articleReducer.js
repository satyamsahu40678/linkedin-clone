import { SET_LOADING_STATUS, GET_ARTICLES, DELETE_ARTICLE } from "../actions/actionType";
//reducer to set loading status get
export const initState = {
    articles: [],
    loading: false,
};

//logic to set set the state of reducers which is taking action as a parameter
const articleReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload,
            };
        case SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.status,
            };
        case DELETE_ARTICLE:
            return {
                ...state,
                articles: state.articles.filter(article => {
                    if (action.payload.sharedImg) {
                        return article.sharedImg !== action.payload.sharedImg;
                    } else if (action.payload.video) {
                        return article.video !== action.payload.video;
                    }
                    return true;
                }), 
            };

        default:
            return state;
    }
};

export default articleReducer;