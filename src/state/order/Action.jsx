import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_BY_ID_FAILURE,
  DELETE_ORDER_BY_ID_REQUEST,
  DELETE_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ADMIN_FAILURE,
  GET_ORDER_BY_ADMIN_REQUEST,
  GET_ORDER_BY_ADMIN_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_USER_FAILURE,
  GET_ORDER_BY_USER_REQUEST,
  GET_ORDER_BY_USER_SUCCESS,
  GET_ORDER_TOP_MONTH_FAILURE,
  GET_ORDER_TOP_MONTH_REQUEST,
  GET_ORDER_TOP_MONTH_SUCCESS,
  GET_ORDER_TOP_WEEK_FAILURE,
  GET_ORDER_TOP_WEEK_REQUEST,
  GET_ORDER_TOP_WEEK_SUCCESS,
  GET_ORDER_TOP_YEAR_FAILURE,
  GET_ORDER_TOP_YEAR_REQUEST,
  GET_ORDER_TOP_YEAR_SUCCESS,
  GET_TOTAL_PRICE_YEAR_FAILURE,
  GET_TOTAL_PRICE_YEAR_REQUEST,
  GET_TOTAL_PRICE_YEAR_SUCCESS,
  GET_TOTAL_QUANTITY_YEAR_FAILURE,
  GET_TOTAL_QUANTITY_YEAR_REQUEST,
  GET_TOTAL_QUANTITY_YEAR_SUCCESS,
  PUT_ORDER_STATUS_BY_ID_FAILURE,
  PUT_ORDER_STATUS_BY_ID_REQUEST,
  PUT_ORDER_STATUS_BY_ID_SUCCESS,
} from "./ActionType";
import { api } from "../../config/apiConfig";
import { toast } from "react-toastify";

// USER

export const getOrdersByUser = () => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_USER_REQUEST });
  try {
    const { data } = await api.get("api/orders/");

    dispatch({ type: GET_ORDER_BY_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ORDER_BY_USER_FAILURE });
  }
};

export const createOrder = (req) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const {data} = await api.post("/api/orders/create", req);
    toast.success("Thanh toán thành công !!!")
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    toast.success("Thanh toán thất bại !!!")
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
  }
};


export const getOrderById = (orderId) => async (dispatch) => {

  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`api/orders/${orderId}`);
    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
  }
};

// ADMIN

export const getOrdersByAdmin = () => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ADMIN_REQUEST });
  try {
    const { data } = await api.get("/api/admin/orders/");
    if (data.status === null || data.status === undefined) {
      dispatch({ type: GET_ORDER_BY_ADMIN_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: GET_ORDER_BY_ADMIN_FAILURE, payload: error.message });
  }
};

export const deleteOrderById = (req) => async (dispatch) => {
  dispatch({type: DELETE_ORDER_BY_ID_REQUEST})
  try {
      const {data} = await api.delete(`api/admin/orders/${req}/delete`)
      dispatch({type: DELETE_ORDER_BY_ID_SUCCESS, data})
  } catch (error) {
      dispatch({type: DELETE_ORDER_BY_ID_FAILURE, payload: error.message})
  }
}

export const putStatusOrderByAdmin = (req) => async (dispatch) => {
  dispatch({type: PUT_ORDER_STATUS_BY_ID_REQUEST})
  try {
      const {data} = await api.put(`api/admin/orders/${req.orderId}/update?status=${req.status}`)
      dispatch({type: PUT_ORDER_STATUS_BY_ID_SUCCESS, payload: req.orderId})
  } catch (error) {
      dispatch({type: PUT_ORDER_STATUS_BY_ID_FAILURE, payload: error.message})
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