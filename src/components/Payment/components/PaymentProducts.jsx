import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarts } from '../../../state/cart/Action';
import { Link } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa";
import { Button } from '@mui/material';
const PaymentProducts = () => {
    const dispatch = useDispatch()
    const {cart} = useSelector(store=>store)
    useEffect(()=>{
        dispatch(getCarts())
}, [dispatch])

    return (
  
        <div className='paymentProducts'>
           <div className='paymentProducts__container'>
           <h3 className='paymentProducts__title'>Đơn hàng ({0} sản phẩm) </h3>
            <hr></hr>
            <div className='paymentProducts__list'>
            {cart.carts.cartItems && cart.carts.cartItems.map((cart) => (
                <div className='paymentProducts__list__item'>
                    <div className='paymentProducts__list__item__img'>
                        <img className='img-fluid' src={cart.imageUrl}></img>
                        <span>{cart.quantity}</span>
                    </div>
                    <div className='paymentProducts__list__item__info'>
                        <h4 className='paymentProducts__list__item__info__title'>{cart.product.title}</h4>
                        <p>{cart.color} /{cart.size}</p>
                    </div>
                    <div>{cart.price}</div>
                </div>
            ))}
            </div>
         
            <hr></hr>
            <div className='paymentProducts__discountCode'>
                <input type='text' placeholder='Nhập mã giảm giá'></input>
                <Button variant="contained" color="success">Áp dụng</Button>

            </div>
            <hr></hr>
            <div className='paymentProducts__price'>
                <p><span>Tạm tính</span><span>{cart.carts.totalDiscountedPrice}</span></p>
                <p>
                    <span>Phí vận chuyển</span>
                    <span>{20}đ</span>
                </p>
            </div>

            <hr></hr>

            <div className='paymentProducts__success'>
            <p>
                <span>Tổng cộng</span>
                <span>{cart.carts.totalDiscountedPrice}</span>
            </p>
                <Link to={'/cart'}><FaAngleLeft /> Quay về giỏ hàng</Link>
                <Button variant="contained">ĐẶT HÀNG</Button>
            </div>
           </div>
        </div>
     
    );
}

export default PaymentProducts;
