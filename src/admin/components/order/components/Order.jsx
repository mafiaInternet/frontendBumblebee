import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Box, Grid, Modal } from "@mui/material";
import { getOrdersByAdmin } from "../../../../state/order/Action";

const StatusOrders = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "COMPLATED",
];
const tableHeads = [
  "Date",
  "Username",
  "Email",
  "Mobile",
  "Address",
  "Price",
  "Status",
  "",
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Order = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const dispatch = useDispatch();
  const { order, customer } = useSelector((store) => store);
  const [open, setOpen] = React.useState({});
  const handleOpen = (orderId) => setOpen({ id: orderId, status: true });
  const handleClose = () => setOpen({ id: null, status: false });
  console.log(open);
  useEffect(() => {
    dispatch(getOrdersByAdmin());
  }, [dispatch]);

  const handleDeleteOrderById = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  const [status, setStatus] = useState("STATUS");
  const [anchorEl, setAnchorEl] = useState(null);
  const openAnchorEl = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen({ id: null, status: false });
  };
  const handleCloseStatus = (event, orderId) => {
    console.log("abc");

    setAnchorEl(null);
    setStatus(event.target.innerText);

    // dispatch(
    //   statusOrderHandler({ status: event.target.innerText, orderId: orderId })
    // );
  };


  return (
    <div className="order">
      <TableContainer>
        <Table className="order__table">
          <TableHead className="order__table__head">
            <TableRow>
              {tableHeads.map((tableHead, index) => (
                <StyledTableCell
                key={index}
                  align={
                    tableHead == "Status" || tableHead == "Delete"
                      ? "center"
                      : "left"
                  }
                >
                  {tableHead}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="order__table__body">
            {order.orders &&
              order.orders.map((order, index) => (
                <TableRow sx={{ cursor: "pointer" }} key={index}>
                  <TableCell align="left" onClick={() => handleOpen(order.id)}>
                    {order.createAt}
                  </TableCell>
                  <TableCell align="left" onClick={() => handleOpen(order.id)}>
                    {order.address.lastName}
                  </TableCell>
                  <TableCell align="left" onClick={() => handleOpen(order.id)}>
                    {order.user.email}
                  </TableCell>
                  <TableCell align="left" onClick={() => handleOpen(order.id)}>
                    {order.address.mobile}
                  </TableCell>
                  <TableCell align="left" onClick={() => handleOpen(order.id)}>
                    {order.address.city}
                  </TableCell>

                  <TableCell align="left">{order.totalPrice}</TableCell>
                  <TableCell align="center">
                    <Button
                      id="basic-button"
                      aria-controls={openAnchorEl ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openAnchorEl ? "true" : undefined}
                      variant="outlined"
                      onClick={handleClick}
                    >
                      {status == "" ? "STATUS" : status}
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openAnchorEl}
                      onClose={handleCloseStatus}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {StatusOrders.map((statusOrder, index) => (
                        <MenuItem
                        key={index}
                          onClick={(e) => handleCloseStatus(e, order.id)}
                        >
                          {statusOrder}
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                  <TableCell align="left">
                    <DeleteIcon
                      color="error"
                      onClick={() => handleDeleteOrderById(order.id)}
                    >
                      Delete
                    </DeleteIcon>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {order.orders &&
        order.orders.map((order, index) => (
          <Modal
          key={index}
            open={open.id == order.id ? true : false}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
          
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Thông tin sản phẩm</TableCell>
                      <TableCell>Số lượng</TableCell>
                      <TableCell>Giá</TableCell>
                      <TableCell>Tổng giá</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.orderItems.map((orderItem, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Grid container spacing={1} sx={{ display: "flex" }}>
                            <Grid item xs={3}>
                              <img loading="lazy"
                                className="img-fluid"
                                src={orderItem.imageUrl}
                                alt="hình ảnh"
                              ></img>
                            </Grid>
                            <Grid item xs={9}>
                              <div>
                                {/* <p>{orderItem.product.title}</p> */}
                                <p>
                                  {orderItem.color} / {orderItem.size}
                                </p>
                              </div>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>{orderItem.quantity}</TableCell>
                        {/* <TableCell>{orderItem.product.discountedPrice}</TableCell> */}
                        <TableCell>{orderItem.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h4>Thông tin địa chỉ giao hàng</h4>
                  <p>
                    <span>Họ và tên: </span>
                    <strong>{order.address.lastName}</strong>
                  </p>
                  <p>
                    <span>Số điện thoại </span>
                    <strong>{order.address.mobile}</strong>
                  </p>
                  <p>
                    <span>Địa chỉ: </span>
                    <strong>{order.address.city}</strong>
                  </p>
                </div>
                <div>
                  <h4>Tổng thanh toán</h4>
                  <p>
                    {order.paymentDetails != null
                      ? "Đã thanh toán Online"
                      : "Thanh toán khi nhận hàng"}
                  </p>
                </div>
              </Box>
              <Button variant="contained">In phiếu</Button>
            </Box>
          </Modal>
        ))}
    </div>
  );
};

export default Order;
