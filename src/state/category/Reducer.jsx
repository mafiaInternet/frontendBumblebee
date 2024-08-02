import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, DELETE_CATEGORY_BY_ID_FAILURE, DELETE_CATEGORY_BY_ID_REQUEST, DELETE_CATEGORY_BY_ID_SUCCESS, GET_CATEGORY_FAILURE, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS } from "./ActionType"

const initialState = {
    categories: [],
    loading: null,
    error: null 
}

export const categoryReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_CATEGORY_REQUEST:
            return {...state, loading: true}
        case GET_CATEGORY_SUCCESS:
            return {...state, loading: false, categories: action.payload}
        case GET_CATEGORY_FAILURE:
            return {...state, loading: false, error: action.payload}
        case DELETE_CATEGORY_BY_ID_REQUEST:
            return {...state, loading: true}
        case DELETE_CATEGORY_BY_ID_SUCCESS:
            return {...state, loading: false, categories: state.categories.filter((item) => item.id != action.payload)}
        case DELETE_CATEGORY_BY_ID_FAILURE:
            return {...state, loading: false, error: action.payload}
        case CREATE_CATEGORY_REQUEST:
            return {...state, loading: true}
        case CREATE_CATEGORY_SUCCESS:
            return {...state, loading: false, categories: state.categories.push(action.payload)}
        case CREATE_CATEGORY_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}