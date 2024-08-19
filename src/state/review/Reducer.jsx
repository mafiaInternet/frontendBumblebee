import { GET_CART_REQUEST, GET_CART_SUCCESS } from "../cart/ActionType"
import { CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_RESPONSE_FAILURE, CREATE_REVIEW_RESPONSE_REQUEST, CREATE_REVIEW_RESPONSE_SUCCESS, CREATE_REVIEW_SUCCESS, GET_REVIEW_BY_ID_PROCUT_FAILURE, GET_REVIEW_BY_ID_PROCUT_REQUEST, GET_REVIEW_BY_ID_PROCUT_SUCCESS, GET_REVIEW_BY_RATING_FAILURE, GET_REVIEW_BY_RATING_REQUEST, GET_REVIEW_BY_RATING_SUCCESS, GET_REVIEW_BY_USER_FAILURE, GET_REVIEW_BY_USER_REQUEST, GET_REVIEW_BY_USER_SUCCESS, GET_REVIEW_FAILURE, GET_REVIEW_REQUEST, GET_REVIEW_SUCCESS } from "./ActionType"

const initalState = {
    review: null,
    reviews: [],
    star: 0,
    error: null,
    loading: null
}

export const reviewReducer = (state = initalState, action) =>{
    switch(action.type){
        case GET_REVIEW_REQUEST:
            return {...state, loading: true}
        case GET_REVIEW_SUCCESS:
     
            let star = 0
            action.payload.forEach(element => {
                star += element.rating
            });
            return {...state, loading: false, reviews: action.payload, star: star}
        case GET_REVIEW_FAILURE:
            return {...state, loading: false, error: action.payload}
        // case GET_REVIEW_BY_ID_PROCUT_REQUEST:
        //     return {...state, loading: true}
        // case GET_REVIEW_BY_ID_PROCUT_SUCCESS:
        //     return {...state, loading: false, reviews: action.payload}
        // case GET_REVIEW_BY_ID_PROCUT_FAILURE:
        //     return {...state, loading: false, error: action.payload}
        case GET_REVIEW_BY_RATING_REQUEST:
            return {...state, loading: true}
        case GET_REVIEW_BY_RATING_SUCCESS:
            return {...state, reviews: action.payload, error: null, loading: false}
        case GET_REVIEW_BY_RATING_FAILURE:
            return {...state, loading: false, error: action.payload}

            case GET_REVIEW_BY_USER_REQUEST:
                return {...state, loading: true}
            case GET_REVIEW_BY_USER_SUCCESS:
                return {...state, reviews: action.payload, error: null, loading: false}
            case GET_REVIEW_BY_USER_FAILURE:
                return {...state, loading: false, error: action.payload}    
        case CREATE_REVIEW_REQUEST:
            return {...state, loading: true}
        case CREATE_REVIEW_SUCCESS:
            return {...state, loading: false, error: null, review: action.payload}
        case CREATE_REVIEW_FAILURE:
            return {...state, loading: false, error: action.payload}
        case CREATE_REVIEW_RESPONSE_REQUEST:
            return {...state, loading: true}
        case CREATE_REVIEW_RESPONSE_SUCCESS:
            return {...state, loading: false, error: null, review: action.payload}
        case CREATE_REVIEW_RESPONSE_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}

