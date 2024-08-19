import { Typography } from '@mui/material';
import React from 'react';

const SystemShop = () => {
    return (
        <div className='systemShop'>
            <Typography component='h1' style={{textAlign: "center"}}>
                Hệ thống cửa hàng
            </Typography>
            <b style={{fontSize: "25px"}}>Teelab</b>
            <div style={{marginLeft: "40px"}}>
                <p>- Website: <a href='https://teelab.vn'>https://teelab.vn</a></p>
                <p>- Shopee Mall: <a href='https://shopee.vn/teelab_official'>https://shopee.vn/teelab_official</a></p>
                <p>- Lazada Mall: <a href='https://lazada.vn/shop/teelab'>https://lazada.vn/shop/teelab</a></p>
            </div>
            <b style={{fontSize: "20px"}}>HỆ THỐNG CỬA HÀNG</b>
            <div style={{marginLeft: "40px"}}>
                <p>- CS1 - Thái Nguyên: 235 Quang Trung, TP Thái Nguyên</p>
                <p>- CS2 - Thái Nguyên: 599 Lương Ngọc Quyến, TP Thái Nguyên</p>
                <p>- CS3 - Thái Bình: 161 Hai Bà Trưng, TP Thái Bình</p>
                <p>- CS4 - Vĩnh Phúc: 06 Mê Linh, TP Vĩnh Yên</p>
                <p>- CS5 - Hải Dương: 09 Nguyễn Thị Duệ, TP Chí Linh</p>
            </div>
        </div>
    );
}

export default SystemShop;
