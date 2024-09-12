import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, putStatusOrderByAdmin } from "../../../../state/order/Action";
import { useParams } from "react-router-dom";
import { Price } from "../../../../config/config";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const head = ["Sản phẩm", "Giá", "Số lượng", "Thành tiền"];

const orderStatus = [
  {
    text: "Đang chờ xác nhận",
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

const OrderInfomation = () => {
  const dispatch = useDispatch();
  const param = useParams()
  const { order } = useSelector((store) => store);
  const [status, setStatus] = useState(
   null
  );
  const handleOrderStatus = (event) => {
    setStatus(event.target.value);
    dispatch(
      putStatusOrderByAdmin({
        orderId: order.order.id,
        status: event.target.value,
      })
    );
  };
  useEffect(() => {
    dispatch(getOrderById(param.orderId));

  }, [dispatch]);


  useEffect(() => {
    if(order.order){

      setStatus(order.order.orderStatus)
    }
  }, [order.order])
  return (
    order.order &&
    order.order && (
      <div className="orderInformation">
        <div className="orderInformation--container">
          <div className="layer"></div>
          <div className="orderInformation--content">
            <div className="orderInformation--content--head">
              <h3>Thông tin đơn hàng</h3>
              <Box>
                <span className="orderInformation--content--head--id">
                  {order.order.id}
                </span>
                <Typography
                  component={"span"}
                  sx={{
                    backgroundColor: orderStatus.find(
                      (item) => item.text === status
                    )?.color,
                  }}
                  className="orderInformation--content--head--status"
                >
                  {status}
                </Typography>
              </Box>
            </div>
            <hr></hr>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <div className="orderInformation--content--customer">
                <strong>Thông tin khách hàng</strong>
                <p>{order.order.user.name}</p>
                <p>{order.order.address.city}</p>
                <p>{order.order.user.email}</p>
                <p>{order.order.user.phone}</p>
              </div>
              <div className="orderInformation--content--order">
                <strong>Phương thức thanh toán</strong>
                <p>{order.order.paymentMethod}</p>
                <strong>Phương thức vận chuyển</strong>
                <p>Giao hàng tiết kiệm</p>
                <strong>Ngày Đặt Hàng</strong>
                <p>{order.order.createAt}</p>
              </div>
            </Box>
            <strong>Thay đổi trạng thái đơn hàng</strong>
            <select value={status} onChange={handleOrderStatus}>
              <option value={"Đang chờ xác nhận"}>Đang chờ xác nhận</option>
              <option value="Đã xác nhận">Đã xác nhận</option>
              <option value={"Đang vận chuyển"}>Đang vận chuyển</option>
              <option value={"Đã giao hàng"}>Đã giao hàng</option>
              <option value={"Đã hủy"}>Đã hủy</option>
            </select>
            <h5>Thông tin sản phẩm</h5>
            <TableContainer>
              <Table className="orderInformation--content--table">
                <TableHead>
                  <TableRow>
                    {head.map((item) => (
                      <StyledTableCell>{item}</StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.order.orderItems.map((item) => (
                    <StyledTableRow>
                      <StyledTableCell>
                        <Box sx={{ display: "flex" }}>
                          <img loading="lazy" className="img-fluid" src={item.imageUrl}></img>
                          <Box sx={{ marginLeft: "1rem" }}>
                            <p>abc</p>
                            <p>{item.size}</p>
                            <p>{item.color}</p>
                          </Box>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell><Price price={item.discountedPrice}></Price></StyledTableCell>
                      <StyledTableCell>{item.quantity}</StyledTableCell>
                      <StyledTableCell>
                      <Price price={item.quantity * item.discountedPrice}></Price>
                   
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    )
  );
};

export default OrderInfomation;
