import axios from "axios";
import { api, apiBase } from "../../config/apiConfig";
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
    const { data } = await api.get(`/cart/user`);
    if (data != "") {
      localStorage.setItem("cart", JSON.stringify(data))
    }
    dispatch({ type: GET_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CART_FAILURE, payload: error.message });
  }
};

export const addItemToCart = (req) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });

  try {
    localStorage.getItem("cart")
    const { data } = await apiBase.put("/cart/test", req)

    localStorage.setItem("cart", JSON.stringify(data))
    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
  }
};

export const createCartItem = (req) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_ORDER_REQUEST });

  try {
    const { data } = await api.post(`/cart/add/demo`, req);
    localStorage.setItem("demo", JSON.stringify(data));
    dispatch({ type: ADD_ITEM_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_ITEM_ORDER_FAILURE, payload: error.message });
  }
};

export const removeItemToCart = (req) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM_REQUEST });
  const arr = [2]
  try {
    const response = await fetch('http://localhost:8080/cart/cartItem/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arr), // Chuyển đổi mảng thành chuỗi JSON
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }

  // try {
  //   const arr = [2]
  //   // const {data} = await api.delete(`/cart/cartItem/delete`, arr);
  //   const response = await axios.delete('http://localhost:8080/cart/cartItem/delete', arr, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
    
  //   // dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: data });
  // } catch (error) {
  //   dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
  // }
};

export const updateItemTOCart = (req) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  try {
    const { data } = await api.put(
      `/cart/cartItem/${req.cartItemId}/update`,
      req.quantity
    );

    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
  }
};
