import { fast } from "@cloudinary/url-gen/qualifiers/FontAntialias";
import {
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_TOP_MONTH_FAILURE,
  GET_ORDER_TOP_MONTH_REQUEST,
  GET_ORDER_TOP_MONTH_SUCCESS,
  GET_ORDER_TOP_WEEK_FAILURE,
  GET_ORDER_TOP_WEEK_REQUEST,
  GET_ORDER_TOP_WEEK_SUCCESS,
  GET_ORDER_TOP_YEAR_FAILURE,
  GET_ORDER_TOP_YEAR_REQUEST,
  GET_ORDER_TOP_YEAR_SUCCESS,
  PUT_ORDER_STATUS_FAILURE,
  PUT_ORDER_STATUS_REQUEST,
  PUT_ORDER_STATUS_SUCCESS,
} from "../type/OrderType";
import { FIND_USER_BY_EMAIL_REQUEST, FIND_USER_BY_EMAIL_SUCCESS } from "../type/CustomerType";

const initialState = {
  order: null,
  orders: [],
  ordersTopCategory: [],
  loadding: null,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { ...state, loadding: true };
    case GET_ORDER_SUCCESS:
      return { ...state, loadding: false, orders: action.payload };
    case GET_ORDER_FAILURE:
      return { ...state, loadding: false, error: action.payload };
    case DELETE_ORDER_REQUEST:
      return { ...state, loadding: true };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loadding: false,
        orders: state.orders.filter((item) => item !== action.payload),
      };
    case DELETE_ORDER_FAILURE:
      return { ...state, loadding: false, error: action.payload };
    case PUT_ORDER_STATUS_REQUEST:
      return { ...state, loadding: true };
    case PUT_ORDER_STATUS_SUCCESS:
      return { ...state, loadding: false, order: action.payload };
    case PUT_ORDER_STATUS_FAILURE:
      return { ...state, loadding: false, error: action.payload };
    case GET_ORDER_TOP_WEEK_REQUEST:
      return { ...state, loadding: true };
    case GET_ORDER_TOP_WEEK_SUCCESS:
      return { ...state, loadding: false, ordersTopCategory: action.payload };
    case GET_ORDER_TOP_WEEK_FAILURE:
      return { ...state, loadding: false, error: action.payload };
    case GET_ORDER_TOP_MONTH_REQUEST:
      return { ...state, loadding: true };
    case GET_ORDER_TOP_MONTH_SUCCESS:
      return { ...state, loadding: false, ordersTopCategory: action.payload };
    case GET_ORDER_TOP_MONTH_FAILURE:
      return { ...state, loadding: false, error: action.payload };
    case GET_ORDER_TOP_YEAR_REQUEST:
      return { ...state, loadding: true };
    case GET_ORDER_TOP_YEAR_SUCCESS:
      return { ...state, loadding: false, ordersTopCategory: action.payload };
    case GET_ORDER_TOP_YEAR_FAILURE:
      return { ...state, loadding: false, error: action.payload };
    
    default:
      return state;
  }
};
