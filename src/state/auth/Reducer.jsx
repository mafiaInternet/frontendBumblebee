import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  PUT_USER_FAILURE,
  PUT_USER_REQUEST,
  PUT_USER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, jwt: null, error: null };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, error: null, jwt: action.payload };
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_USER_SUCCESS:
      return { ...state, isLoading: false, error: null, user: action.payload };
    case GET_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case LOGOUT:
      return { ...state, isLoading: true, jwt: action.payload };
    case PUT_USER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case PUT_USER_SUCCESS:
      return { ...state, isLoading: false, error: null, user: action.payload };
    case PUT_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
