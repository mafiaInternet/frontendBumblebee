import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import thunk from "redux-thunk"
import { authReducer } from "./auth/Reducer";
import { customerProductReducer } from "./product/Reducer";
import { cartReducer } from "./cart/Reducer";
import { orderReducer } from "./order/Reducer";
import { reviewReducer } from "./review/Reducer";
import { addressReducer } from "./address/Reducer";
import {categoryReducer} from "./category/Reducer"
import { voucherReducer } from "./voucher/Reducer";
import { customerReducer } from "./customer/Reducer";

const rootReducers = combineReducers({

    auth:authReducer,
    address: addressReducer,
    products: customerProductReducer,
    cart: cartReducer,
    order: orderReducer,
    customer: customerReducer,
    review: reviewReducer,
    category: categoryReducer,
    voucher: voucherReducer
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));

