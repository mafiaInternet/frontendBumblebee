import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderById, putStatusOrderByAdmin } from "../../../../state/order/Action";

const head = [
  "Khách hàng",
  "Ngày đặt hàng",
  "Giỏ hàng",
  "Trạng thái",
  "Thao tác",
];
const ListOrderNeedComfirm = (props) => {
  const dispatch = useDispatch;
  const [orders, setOrders] = useState(
    props.orders.filter((item) => item.orderStatus === "Đang chờ xác nhận")
  );

  const handleStatusOrder = (orderId) => {
    dispatch(
      putStatusOrderByAdmin({
        orderId: orderId,
        status: "Đã xác nhận",
      })
    );

    const newOrderNeedConfirm = orders.filter((item) => item.id != orderId);
    setOrders(newOrderNeedConfirm);
  };
  return (
    <div className="admin--home--content--orders--confirm">
      <h3
        className="admin--home--content--orders--confirm--title"
        style={{ fontSize: "24px", marginBottom: "20px" }}
      >
        Đơn hàng cần xác nhận
      </h3>
      <hr></hr>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {head.map((item) => (
                <TableCell align="left">{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell align="left">{order.user.name}</TableCell>
                <TableCell align="left">{order.createAt}</TableCell>
                <TableCell align="left">
                  {order.orderItems.length} sản phẩm
                </TableCell>
                <TableCell align="left">
                  <Typography
                    component={"span"}
                    sx={{
                      borderRadius: "3rem",
                      color: "#fff",
                      padding: "0.5rem 1rem",
                      fontSize: "1.8rem",
                      backgroundColor: "#1565c0",
                    }}
                  >
                    {order.orderStatus}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Box>
                    <Button
                      sx={{ marginRight: "1rem", fontSize: "1.3rem" }}
                      variant="contained"
                      color="primary"
                      onClick={() => handleStatusOrder(order.id)}
                    >
                      <CheckIcon></CheckIcon>
                    </Button>
                    <Link
                      to={"/admin/order/info"}
                      onClick={() => dispatch(getOrderById(order.id))}
                    >
                      <Button variant="contained" color="error">
                        <VisibilityIcon></VisibilityIcon>
                      </Button>
                    </Link>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {orders && orders.length > 0 ? (
        <Link className="d-flex justify-content-end" to="/admin/order">
          Xem tất cả đơn hàng{" "}
        </Link>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ fontSize: "20px", marginTop: "20px" }}
        >
          {" "}
          Không có dữ liệu{" "}
        </div>
      )}
    </div>
  );
};

export default ListOrderNeedComfirm;
