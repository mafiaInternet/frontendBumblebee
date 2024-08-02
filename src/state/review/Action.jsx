import { api, apiBase } from "../../config/apiConfig";
import {
  CREATE_REVIEW_FAILURE,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_RESPONSE_FAILURE,
  CREATE_REVIEW_RESPONSE_REQUEST,
  CREATE_REVIEW_RESPONSE_SUCCESS,
  CREATE_REVIEW_SUCCESS,
  GET_REVIEW_BY_RATING_FAILURE,
  GET_REVIEW_BY_RATING_REQUEST,
  GET_REVIEW_BY_RATING_SUCCESS,
  GET_REVIEW_BY_USER_FAILURE,
  GET_REVIEW_BY_USER_REQUEST,
  GET_REVIEW_BY_USER_SUCCESS,
  GET_REVIEW_FAILURE,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
} from "./ActionType";

export const getReviewByProduct = (req) => async (dispatch) => {
  dispatch({ type: GET_REVIEW_REQUEST });
  try {
    const { data } = await api.get(`/api/reviews/product/${req}`);

    dispatch({ type: GET_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_REVIEW_FAILURE, payload: error.message });
  }
};

export const getReviewByRating = (req) => async (dispatch) => {
  dispatch({ type: GET_REVIEW_BY_RATING_REQUEST });
  try {
    const { data } = await api.get(
      `/api/reviews/product/${req.productId}/${req.rating}`
    );
    dispatch({ type: GET_REVIEW_BY_RATING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_REVIEW_BY_RATING_FAILURE, payload: error.message });
  }
};

export const createReview = (req) => async (dispatch) => {
  dispatch({ type: CREATE_REVIEW_REQUEST });
  try {
    const { data } = await api.post("/api/reviews/create", req);
    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_REVIEW_FAILURE, payload: error.message });
  }
};

export const createReviewResponse = (req) => async (dispatch) => {
  dispatch({ type: CREATE_REVIEW_RESPONSE_REQUEST });
  try {
    const { data } = await api.post("/api/reviews/create/response", req);
    dispatch({ type: CREATE_REVIEW_RESPONSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_REVIEW_RESPONSE_FAILURE, payload: error.message });
  }
};

export const getReviewByUser = (req) => async (dispatch) => {
  dispatch({ type: GET_REVIEW_BY_USER_REQUEST });
  try {
    const { data } = await api.get("/api/reviews/user", req);
    dispatch({ type: GET_REVIEW_BY_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_REVIEW_BY_USER_FAILURE, payload: error.message });
  }
};
