import React, { useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import { FilledInput } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../../state/auth/Action';
const PaymentInfo = () => {
   const dispatch = useDispatch()
   const {auth} = useSelector(store=>store)
   const jwt = localStorage.getItem("jwt")
   useEffect(() => {
    if(jwt){

      dispatch(User(jwt))
    }
   }, [dispatch])
   console.log(auth)
const host = 'https://provinces.open-api.vn/api/?depth=1'
const fetchData = async () => {
    try {
      const response = await axios.get(host);
      console.log(response.data);

    } catch (error) {

      console.error(error);
    }
  };
  
  fetchData();
    return (
        <div className='paymentInfo'>
            <div className='paymentInfo__title'>
                <h3 className='paymentInfo__title'>Thông tin nhận hàng</h3>
                
            </div>
            <input type='text' name='name' value={auth.user.firstName}  placeholder="Họ và tên" />
            
            <PhoneInput country={'vn'} value={auth.user.mobile}></PhoneInput>
            <select name='country' >
                <option value="abc">Delete</option>
                <option value="abc">Delete</option>
                <option value="abc">Delete</option>
            </select>
            <textarea name='note'  placeholder='Ghi chú'  />
        </div>
    );
}

export default PaymentInfo;
