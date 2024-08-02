import { type } from "@testing-library/user-event/dist/type"
import { api } from "../../../config/apiConfig"
import { DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_TOP_MONTH_FAILURE, GET_ORDER_TOP_MONTH_REQUEST, GET_ORDER_TOP_MONTH_SUCCESS, GET_ORDER_TOP_WEEK_FAILURE, GET_ORDER_TOP_WEEK_REQUEST, GET_ORDER_TOP_WEEK_SUCCESS, GET_ORDER_TOP_YEAR_FAILURE, GET_ORDER_TOP_YEAR_REQUEST, GET_ORDER_TOP_YEAR_SUCCESS, GET_TOTAL_PRICE_YEAR_FAILURE, GET_TOTAL_PRICE_YEAR_REQUEST, GET_TOTAL_PRICE_YEAR_SUCCESS, GET_TOTAL_QUANTITY_YEAR_FAILURE, GET_TOTAL_QUANTITY_YEAR_REQUEST, GET_TOTAL_QUANTITY_YEAR_SUCCESS, PUT_ORDER_STATUS_FAILURE, PUT_ORDER_STATUS_REQUEST, PUT_ORDER_STATUS_SUCCESS } from "../type/OrderType"



export const getOrdersAll = () => async (dispatch) => {
    dispatch({type: GET_ORDER_REQUEST})
    try {
        const {data} = await api.get("/api/admin/orders/")
        console.log(data)
        dispatch({type: GET_ORDER_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_ORDER_FAILURE, payload: error.message})
    }
}

export const deleteOrder = (req) => async (dispatch) => {
    dispatch({type: DELETE_ORDER_REQUEST})
    try {
        const {data} = await api.delete(`api/admin/orders/${req}/delete`)
        dispatch({type: DELETE_ORDER_SUCCESS, data})
    } catch (error) {
        dispatch({type: DELETE_ORDER_FAILURE, payload: error.message})
    }
}

export const statusOrderHandler = (req) => async (dispatch) => {
    dispatch({type: PUT_ORDER_STATUS_REQUEST})
    try {
        const {data} = await api.put(`api/admin/orders/${req.orderId}/${req.status}`)
        dispatch({type: PUT_ORDER_STATUS_SUCCESS, payload: req.orderId})
        console.log("order status")
    } catch (error) {
        dispatch({type: PUT_ORDER_STATUS_FAILURE, payload: error.message})
    }
}

export const getOrderTopWeek = () => async (dispath) =>{
    dispath({type: GET_ORDER_TOP_WEEK_REQUEST})
    try {
        const {data} = await api.get('api/orders/week')
        dispath({type: GET_ORDER_TOP_WEEK_SUCCESS, payload: data})
    } catch (error) {
        dispath({type: GET_ORDER_TOP_WEEK_FAILURE, payload: error.message})
    }
}

export const getOrderTopMonth = () => async (dispath) =>{
    dispath({type: GET_ORDER_TOP_MONTH_REQUEST})
    try {
        const {data} = await api.get('api/orders/month')
        dispath({type: GET_ORDER_TOP_MONTH_SUCCESS, payload: data})
    } catch (error) {
        dispath({type: GET_ORDER_TOP_MONTH_FAILURE, payload: error.message})
    }
}

export const getOrderTopYear = () => async (dispath) =>{
    dispath({type: GET_ORDER_TOP_YEAR_REQUEST})
    try {
        const {data} = await api.get('api/orders/year')
        dispath({type: GET_ORDER_TOP_YEAR_SUCCESS, payload: data})
    } catch (error) {
        dispath({type: GET_ORDER_TOP_YEAR_FAILURE, payload: error.message})
    }
}

export const getOrderTotalQuantityOfYear = (req) => async (dispath) => {
    dispath({type: GET_TOTAL_QUANTITY_YEAR_REQUEST})
    try {
        const {data} = await api.get(`api/orders/${req}/quantities`)
        console.log(data)
        dispath({type: GET_TOTAL_QUANTITY_YEAR_SUCCESS, payload: data})
    } catch (error) {
        dispath({type: GET_TOTAL_QUANTITY_YEAR_FAILURE, payload: error.message})
    }
}

export const getOrderTotalPriceOfYear = (req) => async (dispath) => {
    dispath({type: GET_TOTAL_PRICE_YEAR_REQUEST})
    try {
        const {data} = await api.get(`api/orders/${req}/prices`)
        console.log(data)
        dispath({type: GET_TOTAL_PRICE_YEAR_SUCCESS, payload: data})
    } catch (error) {
        dispath({type: GET_TOTAL_PRICE_YEAR_FAILURE, payload: error.message})
    }
}