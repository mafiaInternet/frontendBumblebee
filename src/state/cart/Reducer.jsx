import { REGISTER_REQUEST } from "../auth/ActionType"
import { ADD_ITEM_ORDER_FAILURE, ADD_ITEM_ORDER_REQUEST, ADD_ITEM_ORDER_SUCCESS, ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType"

const initialState = {
    cart: [],
    loading: false,
    error: null
}

export const cartReducer = (state = initialState, action) =>{
    switch(action.type){
        case ADD_ITEM_TO_CART_REQUEST:
            return {...state, loading: true, error: null}
        case ADD_ITEM_TO_CART_SUCCESS:
            return {...state, cart: action.payload, loading: false}
        case ADD_ITEM_TO_CART_FAILURE:
            return {...state, loading: false, error: action.payload}
        case GET_CART_REQUEST:
            return {...state, loading: true, error: null}
        case GET_CART_SUCCESS:
            return {...state, cart: action.payload, loading: false}
        case GET_CART_FAILURE:
            return {...state, error: action.payload, loading: false}
        case REMOVE_CART_ITEM_REQUEST:
            return {...state, loading: true, error: null}
        case REMOVE_CART_ITEM_SUCCESS:
 
            return {...state, cart: action.payload, loading: false}
        case REMOVE_CART_ITEM_FAILURE:
            return {...state, loading: false, error: action.payload}
        case UPDATE_CART_ITEM_REQUEST:
            return {...state, loading: true, error: null}
        case UPDATE_CART_ITEM_SUCCESS:
            const index = state.cart.findIndex((item) => item.id === action.payload.id)
            state.cart.splice(index, 1, action.data)
            return {...state,  loading: false,  error: null}
        case UPDATE_CART_ITEM_FAILURE:
            return {...state, loading: false, error: action.payload}
        case ADD_ITEM_ORDER_REQUEST: 
            return {...state, loading: true}
        case ADD_ITEM_ORDER_SUCCESS:
            return {...state, loading: false, carts: action.payload}
        case ADD_ITEM_ORDER_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}