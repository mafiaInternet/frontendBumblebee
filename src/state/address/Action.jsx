
import { api } from "../../config/apiConfig"
import { CREATE_ADDRESS_FAILURE, CREATE_ADDRESS_REQUEST, CREATE_ADDRESS_SUCCESS, DELETE_ADDRESS_FAILURE, DELETE_ADDRESS_REQUEST, DELETE_ADDRESS_SUCCESS, GET_ADDRESS_FAILURE, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS, UPDATE_ADDRESS_DEFAULT_FAILURE, UPDATE_ADDRESS_DEFAULT_REQUEST, UPDATE_ADDRESS_DEFAULT_SUCCESS, UPDATE_ADDRESS_FAILURE, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS } from "./ActionType"

export const getAddressByUser = ()=> async (dispatch) => {

  dispatch({type: GET_ADDRESS_REQUEST})
  try {
    const {data} = await api.get("/api/users/user/address/")

    dispatch({type: GET_ADDRESS_SUCCESS, payload: data})
 
  } catch (error) {
    dispatch({type: GET_ADDRESS_FAILURE, payload: error.message})
  }
}

export const addAddress = (req)=> async (dispatch) =>{
    dispatch({type: CREATE_ADDRESS_REQUEST})
    try {
      const {data} = await api.post('/api/users/user/address/add', req)

      dispatch({type: CREATE_ADDRESS_SUCCESS, payload: data})
    } catch (error) {
      dispatch({type: CREATE_ADDRESS_FAILURE, payload: error.message})
    }
  }
  
  export const deleteAddressByUser = (req) => async (dispatch) => {
    dispatch({type: DELETE_ADDRESS_REQUEST})
    try { 

      const {data} = await api.delete(`/api/users/user/address/${req}/delete`)
      dispatch({type: DELETE_ADDRESS_SUCCESS, payload: req})
    } catch (error) {
      dispatch({type: DELETE_ADDRESS_FAILURE, payload: error.message})
    }
  }
  
  export const updateAddressByUser = (req) => async (dispatch) => {
    dispatch({type: UPDATE_ADDRESS_REQUEST})
    try {
      console.log(req)
      const {data} = await api.put(`/api/users/user/address/${req.addressId}/update`, req.responeData)
     
      dispatch({type: UPDATE_ADDRESS_SUCCESS, payload: data})
    } catch (error) {
      dispatch({type: UPDATE_ADDRESS_FAILURE, payload: error.message})
    }
  }

  export const updateAddressDefault = (req) => async(dispatch) => {
    dispatch({type: UPDATE_ADDRESS_DEFAULT_REQUEST})
    try {
      const {data} = await api.put(`/api/users/user/address/${req}/default`)
      dispatch({type: UPDATE_ADDRESS_DEFAULT_SUCCESS, payload: data})
    } catch (error) {
      dispatch({type: UPDATE_ADDRESS_DEFAULT_FAILURE, payload: error.message})
    }
  }