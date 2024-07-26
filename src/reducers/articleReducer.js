import { SET_LOADING_STATUS, GET_ARTICLES, DELETE_ARTICLE } from "../actions/actionType";

export const initState = {
    articles: [],
    loading: false,
};


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
                articles: state.articles.filter(article => article.actor.image !== action.payload.image),
            };
        default:
            return state;
    }
};

export default articleReducer;