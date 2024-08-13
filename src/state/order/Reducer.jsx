import {
  GET_TOTAL_PRICE_YEAR_FAILURE,
  GET_TOTAL_PRICE_YEAR_REQUEST,
  GET_TOTAL_PRICE_YEAR_SUCCESS,
  GET_TOTAL_QUANTITY_YEAR_FAILURE,
  GET_TOTAL_QUANTITY_YEAR_REQUEST,
  GET_TOTAL_QUANTITY_YEAR_SUCCESS,
} from "../../admin/state/type/OrderType";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILURE,
  GET_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_ITEM,
  CREATE_ORDER_ITEM_FAILURE,
  CREATE_ORDER_ITEM_SUCCESS,
  GET_ORDER_BY_USER_REQUEST,
  GET_ORDER_BY_USER_FAILURE,
  CREATE_CHECKOUT_FAILURE,
  CREATE_CHECKOUT_SUCCESS,
  CREATE_CHECKOUT_REQUEST,
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
} from "./ActionType";

const initialState = {
  orders: [],
  orderTopCategory: [],
  totalOrderQuantityOfYear: [],
  totalOrderPriceOfYear: [],
  order: null,
  error: null,
  loading: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: null,
      };
    case CREATE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_CHECKOUT_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_CHECKOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: null,
      };
    case CREATE_CHECKOUT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_ORDER_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ORDER_BY_ID_SUCCESS:
      return { ...state, loading: false, error: null, order: action.payload };
    case GET_ORDER_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_ORDER_REQUEST:
      return { ...state, loading: true };
    case GET_ORDER_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case GET_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_ORDER_ITEM:
      return { ...state, loading: false, orders: action.payload };
    case CREATE_ORDER_ITEM_FAILURE:
      return { ...state, loading: true };
    case CREATE_ORDER_ITEM_SUCCESS:
      return { ...state, loading: false, order: action.payload, error: null };
    case GET_ORDER_BY_USER_REQUEST:
      return { ...state, loading: true };
    case GET_ORDER_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, order: action.payload };
    case GET_ORDER_BY_USER_REQUEST:
      return { ...state, loading: true };
    case GET_ORDER_BY_USER_SUCCESS:
      return { ...state, loading: false, error: false, orders: action.payload };
    case GET_ORDER_BY_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
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
    case GET_TOTAL_QUANTITY_YEAR_REQUEST:
      return { ...state, loadding: true };
    case GET_TOTAL_QUANTITY_YEAR_SUCCESS:
      return {
        ...state,
        loadding: false,
        totalOrderQuantityOfYear: action.payload,
      };
    case GET_TOTAL_QUANTITY_YEAR_FAILURE:
      return { ...state, loadding: false, error: action.payload };
    case GET_TOTAL_PRICE_YEAR_REQUEST:
      return { ...state, loadding: true };
    case GET_TOTAL_PRICE_YEAR_SUCCESS:
      return {
        ...state,
        loadding: false,
        totalOrderPriceOfYear: action.payload,
      };
    case GET_TOTAL_PRICE_YEAR_FAILURE:
      return { ...state, loadding: false, error: action.payload };
    default:
      return state;
  }
};
