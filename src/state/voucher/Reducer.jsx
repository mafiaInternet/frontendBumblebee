import { CHANGE_VOUCHER_FAILURE, CHANGE_VOUCHER_REQUEST, CHANGE_VOUCHER_SUCCESS, CREATE_VOUCHER_FAILURE, CREATE_VOUCHER_REQUEST, CREATE_VOUCHER_SUCCESS, DELETE_VOUCHER_BY_ID_FAILURE, DELETE_VOUCHER_BY_ID_REQUEST, DELETE_VOUCHER_BY_ID_SUCCESS, FIND_VOUCHER_BY_ID_FAILURE, FIND_VOUCHER_BY_ID_REQUEST, FIND_VOUCHER_BY_ID_SUCCESS, GET_VOUCHER_FAILURE, GET_VOUCHER_REQUEST, GET_VOUCHER_SUCCESS } from "./ActionType"

const initalState = {
    voucher: null,
    vouchers: [],
    loading: null,
    error: null
}
 
export const voucherReducer = (state = initalState, action) => {
    switch(action.type){
        case GET_VOUCHER_REQUEST:
            return {...state, loading: true}
        case GET_VOUCHER_SUCCESS:
            return {...state, loading: false, vouchers: action.payload}
        case GET_VOUCHER_FAILURE:
            return {...state, loading: false, error: action.payload}
        case FIND_VOUCHER_BY_ID_REQUEST:
            return {...state, loading: true}
        case FIND_VOUCHER_BY_ID_SUCCESS:
            return {...state, loading: false, voucher: action.payload}
        case FIND_VOUCHER_BY_ID_FAILURE:
            return {...state, loading: false, error: action.payload}
        case CHANGE_VOUCHER_REQUEST:
            return {...state, loading: true}
        case CHANGE_VOUCHER_SUCCESS:
            return {...state, loading: false, voucher: action.payload}
        case CHANGE_VOUCHER_FAILURE:
            return {...state, loading: false, error: action.payload}
        case DELETE_VOUCHER_BY_ID_REQUEST:
            return {...state, loading: true}
        case DELETE_VOUCHER_BY_ID_SUCCESS:
            return {...state, loading: false, vouchers: state.vouchers.filter((item) => item.id != action.payload)}
        case DELETE_VOUCHER_BY_ID_FAILURE:
            return {...state, loading: false, error: action.payload}
        case CREATE_VOUCHER_REQUEST:
            return {...state, loading: true}
        case CREATE_VOUCHER_SUCCESS:
            return {...state, loading: false, vouchers: state.vouchers.push(action.payload)}
        case CREATE_VOUCHER_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}