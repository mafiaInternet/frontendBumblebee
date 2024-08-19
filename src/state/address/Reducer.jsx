import { CREATE_ADDRESS_FAILURE, CREATE_ADDRESS_REQUEST, CREATE_ADDRESS_SUCCESS, DELETE_ADDRESS_FAILURE, DELETE_ADDRESS_REQUEST, DELETE_ADDRESS_SUCCESS, GET_ADDRESS_FAILURE, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS, UPDATE_ADDRESS_DEFAULT_FAILURE, UPDATE_ADDRESS_DEFAULT_REQUEST, UPDATE_ADDRESS_DEFAULT_SUCCESS, UPDATE_ADDRESS_FAILURE, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: null,
    error: null,
    address: []
}

export const addressReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_ADDRESS_REQUEST:
            return {...state, isLoading: true}
        case GET_ADDRESS_SUCCESS:
            return {...state, isLoading: false, erorr: null, address: action.payload}
        case GET_ADDRESS_FAILURE:
            return {...state, isLoading: false, erorr: action.payload}
        case CREATE_ADDRESS_REQUEST:
            return {...state, isLoading: true, erorr: null}
        case CREATE_ADDRESS_SUCCESS:
            state.address.push(action.payload)
            return {...state, isLoading: false, erorr: null}
        case CREATE_ADDRESS_FAILURE:
            return {...state, isLoading: false, erorr: action.payload}
        case DELETE_ADDRESS_REQUEST:
            return {...state, isLoading: true, erorr: null}
        case DELETE_ADDRESS_SUCCESS:
            return {...state, isLoading: false, erorr: null, address: state.address.filter((item) => item.id !== action.payload)}
        case DELETE_ADDRESS_FAILURE:
            return {...state, isLoading: false, erorr: action.payload}
        case UPDATE_ADDRESS_REQUEST:
            return {...state, isLoading: true, erorr: null}
        case UPDATE_ADDRESS_SUCCESS:
            const index = state.address.findIndex((item) => item.id === action.payload.id)
            state.address.splice(index, 1, action.payload)
            return {...state, isLoading: false, erorr: null}
        case UPDATE_ADDRESS_FAILURE:
            return {...state, isLoading: false, error: action.payload}
        case UPDATE_ADDRESS_DEFAULT_REQUEST:
            return {...state, isLoading: true, erorr: null}
        case UPDATE_ADDRESS_DEFAULT_SUCCESS:
            return {...state, isLoading: false, erorr: null}
        case UPDATE_ADDRESS_DEFAULT_FAILURE:
            return {...state, isLoading: false, error: action.payload}
        default:
            return state
    }
}