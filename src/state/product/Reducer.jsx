import {
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_SUCCESS,
  FIND_PRODUCT_FAILURE,
  FIND_PRODUCT_REQUEST,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  DELETE_PRODUCT_BY_ID_REQUEST,
  DELETE_PRODUCT_BY_ID_SUCCESS,
  DELETE_PRODUCT_BY_ID_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  GET_PRODUCTS_NEW_BY_CATEGORY_SUCCESS,
  GET_PRODUCTS_NEW_BY_CATEGORY_FAILURE,
  GET_PRODUCTS_NEW_BY_CATEGORY_REQUEST,
  SORT_PRODUCTS_HIGH_SUCCESS,
  SORT_PRODUCTS_HIGH_REQUEST,
  SORT_PRODUCTS_LOW_SUCCESS,
  SORT_PRODUCTS_LOW_REQUEST,
  SORT_PRODUCTS_NEW_FAILURE,
  SORT_PRODUCTS_NEW_SUCCESS,
  SORT_PRODUCTS_NEW_REQUEST,
  SORT_PRODUCTS_HIGH_FAILURE,
  FIND_PRODUCT_FILTER_REQUEST,
  FIND_PRODUCT_FILTER_SUCCESS,
  FIND_PRODUCT_FILTER_FAILURE,
  SORT_PRODUCTS_OLD_REQUEST,
  SORT_PRODUCTS_OLD_SUCCESS,
  SORT_PRODUCTS_OLD_FAILURE,
  SORT_PRODUCTS_LOW_FAILURE,
} from "./ActionType";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCT_REQUEST:
    case FIND_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };
    case FIND_PRODUCT_FAILURE:
    case FIND_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: false, error: null };
    case FIND_PRODUCT_BY_ID_SUCCESS:
      return { ...state, loading: true, error: null, product: action.payload };
    case FIND_PRODUCT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };
    case GET_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: state.products.filter((item) => item.id !== action.payload),
      };
    case DELETE_PRODUCT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: state.products.push(action.payload),
      };
    case CREATE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_PRODUCTS_NEW_BY_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case GET_PRODUCTS_NEW_BY_CATEGORY_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case GET_PRODUCTS_NEW_BY_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // sắp xếp danh sách từ cũ đến mới
    case SORT_PRODUCTS_OLD_REQUEST:
      return { ...state, loading: true };
    case SORT_PRODUCTS_OLD_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        error: false,
        products: action.payload,
      };
    case SORT_PRODUCTS_OLD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // sắp xếp danh sách từ mới đến cũ
    case SORT_PRODUCTS_NEW_REQUEST:
      return { ...state, loading: true };
    case SORT_PRODUCTS_NEW_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        error: false,
        products: action.payload,
      };
    case SORT_PRODUCTS_NEW_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // sắp xếp danh sách theo giá từ thấp đến cao
    case SORT_PRODUCTS_LOW_REQUEST:
      return { ...state, loading: true };
    case SORT_PRODUCTS_LOW_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        error: false,
        products: action.payload,
      };
    case SORT_PRODUCTS_LOW_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // sắp xếp danh sách theo giá từ cao đến thấp
    case SORT_PRODUCTS_HIGH_REQUEST:
      return { ...state, loading: true };
    case SORT_PRODUCTS_HIGH_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        error: false,
        products: action.payload,
      };
    case SORT_PRODUCTS_HIGH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // Tìm sản phẩm
    case FIND_PRODUCT_FILTER_REQUEST:
      return { ...state, loading: true };
    case FIND_PRODUCT_FILTER_SUCCESS:
      console.log(action.payload);
      return { ...state, loading: false, products: action.payload };
    case FIND_PRODUCT_FILTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
