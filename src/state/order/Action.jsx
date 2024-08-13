import {
  CREATE_CHECKOUT_FAILURE,
  CREATE_CHECKOUT_REQUEST,
  CREATE_CHECKOUT_SUCCESS,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_ITEM_FAILURE,
  CREATE_ORDER_ITEM_REQUEST,
  CREATE_ORDER_ITEM_SUCCESS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_USER_FAILURE,
  GET_ORDER_BY_USER_REQUEST,
  GET_ORDER_BY_USER_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDER_ITEM,
  GET_ORDER_ITEM_REQUEST,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "./ActionType";
import { api } from "../../config/apiConfig";
import { toast } from "react-toastify";

export const createOrder = (req) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const {data} = await api.post("/api/orders/demo", req);
    toast.success("Thanh toán thành công !!!")
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    toast.success("Thanh toán thất bại !!!")
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
  }
};

export const checkout = (req) => async (dispatch) => {
  dispatch({ type: CREATE_CHECKOUT_REQUEST });
  try {
    const { data } = await api.post("api/orders/checkout", req);

    dispatch({ type: CREATE_CHECKOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_CHECKOUT_FAILURE, payload: error.message });
  }
};

export const getOrderByUser = () => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_USER_REQUEST });
  try {
    const { data } = await api.get("api/orders/user");

    dispatch({ type: GET_ORDER_BY_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ORDER_BY_USER_FAILURE });
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

export const getOrdersAll = () => async (dispatch) => {
  dispatch({ type: GET_ORDER_REQUEST });
  try {
    const { data } = await api.get("/api/admin/orders/");
    if (data.status === null || data.status === undefined) {
      dispatch({ type: GET_ORDER_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: GET_ORDER_FAILURE, payload: error.message });
  }
};

export const createOrderItem = (req) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_ITEM_REQUEST });
  try {
    const { data } = await api.post(
      "http://localhost:8080/api/orders/order/demo",
      req
    );

    dispatch({ type: CREATE_ORDER_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_ITEM_FAILURE, payload: error.message });
  }
};
