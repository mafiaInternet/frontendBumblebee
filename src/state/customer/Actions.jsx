
import { api } from "../../config/apiConfig"
import { DELETE_CUSTOMER_FAILURE, DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_SUCCESS, EDIT_USER_BY_ADMIN_FAILURE, EDIT_USER_BY_ADMIN_REQUEST, EDIT_USER_BY_ADMIN_SUCCESS, FIND_USER_BY_EMAIL_FAILURE, FIND_USER_BY_EMAIL_REQUEST, FIND_USER_BY_EMAIL_SUCCESS, GET_CUSTOMERS_FAILURE, GET_CUSTOMERS_REQUEST, GET_CUSTOMERS_SUCCESS, GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS } from "./ActionType"


export const getCustomers  = () => async (dispatch)=> {
    dispatch({type: GET_CUSTOMERS_REQUEST})
    try{
        const {data} = await api.get('/api/admin/customers/')
        console.log(data)
        dispatch({type: GET_CUSTOMERS_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: GET_CUSTOMERS_FAILURE, payload: error.message})
    }
}

export const deleteCustomerById = (req) => async (dispatch) => {
    dispatch({type: DELETE_CUSTOMER_REQUEST})
    try {
        const {data} = await api.delete(`api/admin/customers/&{req}/delete`)
        dispatch({type: DELETE_CUSTOMER_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: DELETE_CUSTOMER_FAILURE, payload: error.message})
    }
}

export const getUserById = (req) => async (dispatch) => {
    dispatch({type: GET_USER_BY_ID_REQUEST})
    try {
        const {data} = await api.get(`api/users/user/${req}`)
        dispatch({type: GET_USER_BY_ID_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_USER_BY_ID_FAILURE, payload: error.message})       
    }
}

export const editUserById = (req) => async (dispatch) => {
    dispatch({type: EDIT_USER_BY_ADMIN_REQUEST})
    try {
        console.log(req)
        const {data} = await api.post(`api/users/user/update`, req)
        console.log(data)
        dispatch({type: EDIT_USER_BY_ADMIN_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: EDIT_USER_BY_ADMIN_FAILURE, payload: error.message})
    }
}

export const findUserByEmail = (req) => async (dispatch) => {
    dispatch({type: FIND_USER_BY_EMAIL_REQUEST})
    try {
        const {data} = await api.get(`api/admin/customers/search?email=${req}`)
        dispatch({type: FIND_USER_BY_EMAIL_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: FIND_USER_BY_EMAIL_FAILURE, payload: error.message})
    }

}