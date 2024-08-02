import { fast } from "@cloudinary/url-gen/qualifiers/FontAntialias";
import {
  DELETE_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  EDIT_USER_BY_ADMIN_FAILURE,
  EDIT_USER_BY_ADMIN_REQUEST,
  EDIT_USER_BY_ADMIN_SUCCESS,
  FIND_USER_BY_EMAIL_FAILURE,
  FIND_USER_BY_EMAIL_REQUEST,
  FIND_USER_BY_EMAIL_SUCCESS,
  GET_CUSTOMERS_FAILURE,
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
} from "../type/CustomerType";

const initialState = {
  customer: null,
  customers: [],
  loading: null,
  error: null,
};

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_REQUEST:
      return { ...state, loading: true };
    case GET_CUSTOMERS_SUCCESS:
      return { ...state, loading: false, customers: action.payload };
    case GET_CUSTOMERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_CUSTOMER_REQUEST:
      return { ...state, loading: true };
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: state.customers.filter((item) => item.id != action.payload),
      };
    case DELETE_CUSTOMER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_USER_BY_ID_REQUEST:
      return { ...state, loading: true };
    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        customer: action.payload,
      };
    case GET_CUSTOMERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EDIT_USER_BY_ADMIN_REQUEST:
      return { ...state, loading: true };
    case EDIT_USER_BY_ADMIN_SUCCESS:
      return { ...state, loading: false, customer: action.payload };
    case EDIT_USER_BY_ADMIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FIND_USER_BY_EMAIL_REQUEST:
      return { ...state, loadding: true };
    case FIND_USER_BY_EMAIL_SUCCESS:
      return { ...state, loadding: false, customer: action.payload };
    case FIND_USER_BY_EMAIL_FAILURE:
      return { ...state, loadding: false, error: action.payload };
    default:
      return state;
  }
};
