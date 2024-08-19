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
      toast.success("Đăng ký thành công !!!")
      localStorage.setItem("jwt", user.jwt);
    }

    dispatch(registerSuccess);
  } catch (error) {
    toast.error("Đăng ký thất bại")
    dispatch(registerFailure(error.message));
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const Login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  localStorage.removeItem("jwt")
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    const user = response.data;
    if (user.jwt) {
      toast.success("Đăng nhập thành công !!!")
      localStorage.setItem("jwt", user.jwt);
    }
    dispatch(loginSuccess(user.jwt));
  } catch (error) {
    toast.success("Đăng nhập thất bại !!!")
    dispatch(loginFailure(error.message));
  }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const User = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json"
        }
    });
    const user = response.data;

    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

export const GetAdmin = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/admin`, {
        headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json"
        }
    });
    const user = response.data;

    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};


export const Logout = () => async (dispatch) =>{
    dispatch({type: LOGOUT, payload: null})

    const response = await axios.post(`${API_BASE_URL}/auth/logout`)
    toast.success("Đăng xuất thành công !!!")
    // localStorage.removeItem('jwt')
    localStorage.clear()
   
}
