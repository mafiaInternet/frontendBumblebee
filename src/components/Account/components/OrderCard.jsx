import { Typography } from "@mui/material";
import React from "react";
import { FormatDateTime, Price } from "../../../config/config";
const orderStatus = [
  {
    text: "Đang xử lý",
    color: "#0d6efd",
  },
  {
    text: "Đã xác nhận",
    color: "#0d6efd",
  },
  {
    text: "Đang vận chuyển",
    color: "#ffc107",
  },
  {
    text: "Hoàn tất",
    color: "#198754",
  },
  {
    text: "Đã hủy",
    color: "#c62828",
  },
];
const OrderCard = ({ order }) => {
  return (
    <div className="order--card">
      <div className="container">
        <div className="order--card--top">
          <p>
            <span className="order--card--top--id">#{order.id}</span>
            <Typography
              component={"span"}
              sx={{
                backgroundColor: orderStatus.find(
                  (status) => status.text === order.orderStatus
                )?.color,
                color: "#fff",
                fontSize: "1.4rem",
                padding: "0.5rem 1rem",
                borderRadius: "3rem",
              }}
            >
              {order.orderStatus}
            </Typography>
          </p>
          <span>
            <FormatDateTime time={order.createAt}></FormatDateTime>
          </span>
        </div>
        <hr></hr>
        <div className="order--card--content">
          <img loading="lazy" className="img-fluid" src={order.orderItems[0].imageUrl}></img>
          <p>Khám phá thế giới động vật</p>
        </div>
        <hr></hr>
        <p className="order--card--total">
          <span>{order.totalItem} sản phẩm</span>
          <span>
            Tổng tiền:{" "}
            <strong>
              <Price price={order.totalPrice}></Price>
            </strong>
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
