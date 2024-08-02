import { Typography } from "@mui/material";
import React from "react";

const OrderCard = () => {
  return (
    <div className="order--card">
      <div className="container">
        <div className="order--card--top">
          <p>
            <span className="order--card--top--id">#1034759</span>
            <Typography component={'span'} sx={{borderRadius: "3rem", backgroundColor: "green", padding: "0.5rem 1rem", color: "white"}} className="order--card--top--status">Hoàn tất</Typography>
          </p>
          <span>18/06/2024 - 15:02</span>
        </div>
        <hr></hr>
        <div className="order--card--content">
          <img className="img-fluid" src="/img/anh-trang-hinh-nen-avatar-trang-tinh-dep-14.jpg"></img>
          <p>Khám phá thế giới động vật</p>
        </div>
        <hr></hr>
        <p className="order--card--total">
          <span>2 sản phẩm</span>
          <span>Tổng tiền: <strong>155.000 đ</strong></span>
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
