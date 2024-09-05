import { api, apiBase } from "../../config/apiConfig";
import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_BY_ID_FAILURE,
  DELETE_PRODUCT_BY_ID_REQUEST,
  DELETE_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_CATEGORY_FAILURE,
  FIND_PRODUCT_BY_CATEGORY_REQUEST,
  FIND_PRODUCT_BY_CATEGORY_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_FILTER_FAILURE,
  FIND_PRODUCT_FILTER_REQUEST,
  FIND_PRODUCT_FILTER_SUCCESS,
  GET_PRODUCTS_NEW_BY_CATEGORY_FAILURE,
  GET_PRODUCTS_NEW_BY_CATEGORY_REQUEST,
  GET_PRODUCTS_NEW_BY_CATEGORY_SUCCESS,
  GET_PRODUCT_FAILURE,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  SORT_PRODUCTS_HIGH_FAILURE,
  SORT_PRODUCTS_HIGH_REQUEST,
  SORT_PRODUCTS_HIGH_SUCCESS,
  SORT_PRODUCTS_LOW_FAILURE,
  SORT_PRODUCTS_LOW_REQUEST,
  SORT_PRODUCTS_LOW_SUCCESS,
  SORT_PRODUCTS_NEW_FAILURE,
  SORT_PRODUCTS_NEW_REQUEST,
  SORT_PRODUCTS_NEW_SUCCESS,
  SORT_PRODUCTS_OLD_FAILURE,
  SORT_PRODUCTS_OLD_REQUEST,
  SORT_PRODUCTS_OLD_SUCCESS,
} from "./ActionType";
import { toast } from "react-toastify";

// USER && ADMIN

export const getProducts = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_REQUEST });
  try {
    const { data } = await apiBase.get(`/products/all`);

    dispatch({ type: GET_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_FAILURE, payload: error.message });
  }
};

export const findProductsById = (req) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

  try {
    const { data } = await apiBase.get(`/products/product/${req}`);

    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const findProductsByCategory = (req) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_CATEGORY_REQUEST });

  try {
    const { data } = await apiBase.get(`products/category/${req}`);
    dispatch({ type: FIND_PRODUCT_BY_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCT_BY_CATEGORY_FAILURE,
      payload: error.message,
    });
  }
};


export const getProductsByCategoryNew = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_NEW_BY_CATEGORY_REQUEST });
  try {
    const { data } = await api.get(`/api/products/category`);

    dispatch({ type: GET_PRODUCTS_NEW_BY_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_NEW_BY_CATEGORY_FAILURE,
      payload: error.message,
    });
  }
};

export const sortProductsOld = (req) => async (dispatch) => {
  dispatch({ type: SORT_PRODUCTS_OLD_REQUEST });

  try {
    const { data } = await apiBase.post("products/sort/old", req);

    dispatch({ type: SORT_PRODUCTS_OLD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SORT_PRODUCTS_OLD_FAILURE, payload: error.message });
  }
};

export const sortProductsNew = (req) => async (dispatch) => {
  dispatch({ type: SORT_PRODUCTS_NEW_REQUEST });

  try {
    const { data } = await apiBase.post("products/sort/new", req);

    dispatch({ type: SORT_PRODUCTS_NEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SORT_PRODUCTS_NEW_FAILURE, payload: error.message });
  }
};

export const sortProductsLow = (req) => async (dispatch) => {
  dispatch({ type: SORT_PRODUCTS_LOW_REQUEST });
  try {
    const { data } = await apiBase.post("products/sort/low", req);

    dispatch({ type: SORT_PRODUCTS_LOW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SORT_PRODUCTS_LOW_FAILURE, payload: error.message });
  }
};

export const sortProductsHigh = (req) => async (dispatch) => {
  dispatch({ type: SORT_PRODUCTS_HIGH_REQUEST });

  try {
    const { data } = await apiBase.post("products/sort/high", req);

    dispatch({ type: SORT_PRODUCTS_HIGH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SORT_PRODUCTS_HIGH_FAILURE, payload: error.message });
  }
};

export const findProductFilter = (req) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_FILTER_REQUEST });
  try {
    const { data } = await apiBase.get(
      `products/search?category=${req.category}&&title=${req.title}`
    );
    dispatch({ type: FIND_PRODUCT_FILTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_FILTER_FAILURE, payload: error.message });
  }
};

// ADMIN

export const deleteProductById = (req) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_BY_ID_REQUEST });
  try {
    const { data } = await api.delete(`/api/admin/products/${req}/delete`);
    dispatch({ type: DELETE_PRODUCT_BY_ID_SUCCESS, payload: req });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const createProduct = (req) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });
  try {
    const { data } = await api.post("/api/admin/products/create", req);
    toast.success("Thêm sản phẩm mới thành công !!!")
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    toast.error("Thêm sản phẩm mới thất bại !!!")
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
  }
};