import { Box, Typography } from '@mui/material';
import React from 'react';

const Policy = () => {
    return (
        <div className='policy' style={{fontSize: '2rem'}}>
            <Typography component='h1' style={{textAlign: 'center', fontWeight:"500"}}>Chính sách đổi trả</Typography>
            <b style={{fontSize: "20px"}}>1. chính sách đổi sản phẩm</b>
            <b>a. đổi size</b>
            <div style={{marginLeft: "40px"}}>
                <p>– Áp dụng 01 lần đổi /1 đơn hàng với các đơn hàng mua online và các đơn hàng mua tại cửa hàng.</p>
                <p>– Sản phẩm đổi trong thời gian 3 ngày kể từ ngày mua hàng trên hoá đơn (đối với khách mua hàng trực tiếp tại cửa hàng), 3 ngày kể từ ngày nhận hàng (Đối với khách mua online)</p>
                <p>– Sản phẩm còn mới nguyên tem, tags và mang theo hoá đơn mua hàng, sản phẩm chưa giặt và không dơ bẩn, hư hỏng bởi những tác nhân bên ngoài cửa hàng sau khi mua hàng.</p>
                <p>– Không áp dụng đối với các sản phẩm là phụ kiện</p>
            </div>
            <b>b. Đổi sản phẩm lỗi</b>
            <div style={{marginLeft: "40px"}}>
                <p>Điều kiện áp dụng:</p>
                <p>– Sản phẩm lỗi kỹ thuật: Sản phẩm rách, bung keo, …</p>
                <p>Trường hợp không được giải quyết:</p>
                <p>– Sản phầm đã qua sử dụng</p>
                <p>Đối với sản phẩm lỗi kỹ thuật cần phản hồi đến TEELAB trong vòng 3 ngày, kể từ ngày mua hàng trên hoá đơn đối với khách mua trực tiếp tại cửa hàng, 3 ngày kể từ ngày nhận hàng đối với khách mua online. </p>
            </div>
            <b style={{fontSize: "20px"}}>2. PHƯƠNG THỨC ĐỔI SẢN PHẨM</b>
            <div style={{marginLeft: "40px"}}>
                <p>– Hàng mua trực tiếp tại cửa hàng: Đổi trả trực tiếp tại cửa hàng mua hàng</p>
                <p>– Hàng mua online (thông qua webiste, Shopee, Lazada): liên hệ fanpage Teelab để được hướng dẫn đổi trả</p>
            </div>
            <b style={{fontSize: "20px"}}>3. CHI PHÍ ĐỔI HÀNG</b>
            <div style={{marginLeft: "40px"}}>
                <p>– Miễn phí đổi hàng cho khách mua ở TEELAB trong trường hợp bị lỗi từ nhà sản xuất, giao nhầm hàng, bị hư hỏng trong quá trình vận chuyển hàng.</p>
                <p>– Trong trường hợp không vừa size hay khách hàng không ưng sản phẩm không muốn nhận hàng phiền khách hàng trả ship hoàn đơn hàng về</p>
            </div>
            <b>TEELAB</b>
            <b>Experiment on Your Style</b>
        </div>  
    );
}

export default Policy;
