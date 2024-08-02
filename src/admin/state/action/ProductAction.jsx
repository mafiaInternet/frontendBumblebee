import { ADD_PRODUCT_FAILURE, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS } from "../type/ProductType"

export const addProduct = (req) => async (dispatch) => {
    dispatch({type: ADD_PRODUCT_REQUEST})
    try{
        const {imageUrl, title, color, total, price, discountedPrice, description, sizes} = req
   
      
    }catch(error){
        dispatch({type: ADD_PRODUCT_FAILURE, payload: error.message})
    }
}