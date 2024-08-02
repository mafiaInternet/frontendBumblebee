import { api } from "../../config/apiConfig";
import {
  ADD_ITEM_ORDER_FAILURE,
  ADD_ITEM_ORDER_REQUEST,
  ADD_ITEM_ORDER_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

export const getCarts = () => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const { data } = await api.get(`/api/cart/user`);
    dispatch({ type: GET_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CART_FAILURE, payload: error.message });
  }
};

export const addItemToCart = (req) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });

  try {
    const { data } = await api.put(`/api/cart/add`, req);
    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
  }
};

export const createCartItem = (req) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_ORDER_REQUEST });

  try {
    const { data } = await api.post(`/api/cart/add/demo`, req);
    localStorage.setItem("demo", JSON.stringify(data));
    dispatch({ type: ADD_ITEM_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_ITEM_ORDER_FAILURE, payload: error.message });
  }
};

export const removeItemToCart = (req) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM_REQUEST });
  try {
    const respone = await api.delete(`/api/cart/cartItem/delete`, {
      data: req,
    });
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: respone.data });
  } catch (error) {
    dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
  }
};

export const updateItemTOCart = (req) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  try {
    const { data } = await api.put(
      `/api/cart/cartItem/${req.cartItemId}/update`,
      req.quantity
    );

    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
  }
};
