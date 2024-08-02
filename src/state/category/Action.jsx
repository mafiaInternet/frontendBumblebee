import { api } from "../../config/apiConfig"
import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, DELETE_CATEGORY_BY_ID_FAILURE, DELETE_CATEGORY_BY_ID_REQUEST, DELETE_CATEGORY_BY_ID_SUCCESS, GET_CATEGORY_FAILURE, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS } from "./ActionType"

export const getCategory = () => async (dispatch) =>{
    dispatch({type: GET_CATEGORY_REQUEST})
    try {
        const {data} = await api.get("api/categories/abc")
        dispatch({type: GET_CATEGORY_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_CATEGORY_FAILURE, payload: error.message})
    }
} 

export const deleteCategory = (req) => async (dispatch) => {
    dispatch({type: DELETE_CATEGORY_BY_ID_REQUEST})
    try {
        const {data} = await api.delete(`api/categories/category/${req}/delete`)
        dispatch({type: DELETE_CATEGORY_BY_ID_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: DELETE_CATEGORY_BY_ID_FAILURE, payload: error.message})
    }
}

export const createCategory = (req) => async (dispatch) => {
    dispatch({type: CREATE_CATEGORY_REQUEST})
    try {
        const {data} = await api.post("api/categories/categpry/add", req)
        dispatch({type: CREATE_CATEGORY_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: CREATE_CATEGORY_FAILURE, payload: error.message})
    }
}