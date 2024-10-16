import axios from "axios";
import { API_BASE_URL, api } from "../../config/apiConfig";
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGOUT,
  PUT_USER_REQUEST,
  PUT_USER_FAILURE,
  PUT_USER_SUCCESS,
} from "./ActionType";
import { toast } from "react-toastify";



const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const Register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    if (user.jwt) {
      toast.success("Đăng ký thành công !!!");
      localStorage.setItem("jwt", user.jwt);
    }
    dispatch(registerSuccess);
  } catch (error) {
    toast.error("Đăng ký thất bại");
    dispatch(registerFailure(error.message));
  }
};

export const Login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  localStorage.removeItem("jwt");
  try {

    const {data} = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    if (data.jwt) {
      toast.success("Đăng nhập thành công !!!");
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    }
  } catch (error) {
    toast.success("Đăng nhập thất bại !!!");
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const User = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({type: GET_USER_SUCCESS, payload: response.data});
  } catch (error) {
    console.error("Error fetching user profile:", error);
    dispatch({ type: GET_USER_FAILURE, payload: error });
  }
};

export const GetAdmin = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/admin`, {
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    const user = response.data;

    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

export const Logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });

  localStorage.removeItem('jwt')
  const response = await axios.post(`${API_BASE_URL}/auth/logout`);
  toast.success("Đăng xuất thành công !!!");
  localStorage.clear();
};

export const putUser = (req) => async (dispatch) => {
  dispatch({type: PUT_USER_REQUEST})
  try {
    const {data} = await api.put('api/users/user/update', req)
    dispatch({type: PUT_USER_SUCCESS, payload: data})
  } catch (error) {
    dispatch({type: PUT_USER_FAILURE, payload: error.message})
  }
}
