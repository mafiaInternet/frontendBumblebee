
import { api } from "../../config/apiConfig"
import { CHANGE_VOUCHER_FAILURE, CHANGE_VOUCHER_REQUEST, CHANGE_VOUCHER_SUCCESS, CREATE_VOUCHER_FAILURE, CREATE_VOUCHER_REQUEST, CREATE_VOUCHER_SUCCESS, DELETE_VOUCHER_BY_ID_FAILURE, DELETE_VOUCHER_BY_ID_REQUEST, FIND_VOUCHER_BY_ID_FAILURE, FIND_VOUCHER_BY_ID_REQUEST, FIND_VOUCHER_BY_ID_SUCCESS, GET_VOUCHER_FAILURE, GET_VOUCHER_REQUEST, GET_VOUCHER_SUCCESS } from "./ActionType"

export const handleCreateVoucher = (req) => async (dispath) => {
    dispath({type: CREATE_VOUCHER_REQUEST})
    try {
        const {data} = await api.post("api/admin/voucher/create", req)
        dispath({type: CREATE_VOUCHER_SUCCESS, payload: data})
    } catch (error) {
        dispath({type: CREATE_VOUCHER_FAILURE, payload: error.message})
    } 
}

export const handleGetVouchers = () => async (dispath) => {
    dispath({type: GET_VOUCHER_REQUEST})
    try {
        const response = await api.get("api/admin/voucher/")
        dispath({type: GET_VOUCHER_SUCCESS, payload: response.data})
    } catch (error) {
        dispath({type: GET_VOUCHER_FAILURE, payload: error.message})
    }
}

export const handleFindVoucherById = (req) => async (dispath) =>{
    dispath({type: FIND_VOUCHER_BY_ID_REQUEST})
    try {
        const {data} = api.get(`api/admin/voucher/${req}`)
        dispath({type: FIND_VOUCHER_BY_ID_SUCCESS, payload: data})
    } catch (error) {
        dispath({type: FIND_VOUCHER_BY_ID_FAILURE, payload: error.message})
    }
}

export const handleEditVoucher = (req) => async (dispath) => {
    dispath({type: CHANGE_VOUCHER_REQUEST})
    try {
        const {data} = await api.put(`api/adim/voucher/${req.id}`, req.body)
        dispath({type: CHANGE_VOUCHER_SUCCESS, payload: data})
    } catch (error) {
        dispath({type: CHANGE_VOUCHER_FAILURE, payload: error.message})
    }
}

export const handleDeleteVoucherById = (req) => async (dispath) => {
    dispath({type: DELETE_VOUCHER_BY_ID_REQUEST})
    try {
        const {data} = await api.delete(`api/admin/voucher/${req}/delete`)
    } catch (error) {
        dispath({type: DELETE_VOUCHER_BY_ID_FAILURE, payload: error.message})
    }
}