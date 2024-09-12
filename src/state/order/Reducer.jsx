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
  GET_ORDER_BY_USER_REQUEST,
  GET_ORDER_BY_USER_FAILURE,
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
  GET_TOTAL_PRICE_YEAR_SUCCESS,
  GET_TOTAL_PRICE_YEAR_REQUEST,
  GET_TOTAL_QUANTITY_YEAR_FAILURE,
  GET_TOTAL_QUANTITY_YEAR_SUCCESS,
  GET_TOTAL_QUANTITY_YEAR_REQUEST,
  GET_ORDER_BY_ADMIN_SUCCESS,
  GET_ORDER_BY_ADMIN_REQUEST,
  GET_ORDER_BY_ADMIN_FAILURE,
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
    // USER 
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
    case GET_ORDER_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ORDER_BY_ID_SUCCESS:
      return { ...state, loading: false, error: null, order: action.payload };
    case GET_ORDER_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_ORDER_BY_USER_REQUEST:
      return { ...state, loading: true };
    case GET_ORDER_BY_USER_SUCCESS:
      return { ...state, loading: false, error: false, orders: action.payload };
    case GET_ORDER_BY_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ADMIN
    case GET_ORDER_BY_ADMIN_REQUEST:
      return {...state, loadding: true, error: null};
    case GET_ORDER_BY_ADMIN_SUCCESS:
      return {...state, loadding: false, orders: action.payload}
    case GET_ORDER_BY_ADMIN_FAILURE:
      return {...state, loadding: false, error: action.payload}
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
