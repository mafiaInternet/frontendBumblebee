import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAll } from "../../../state/action/OrderAction";
import { getOrderById } from "../../../../state/order/Action";
import { Link } from "react-router-dom";

const head = [
  "Mã đơn hàng",
  "Người đặt",
  "Email",
  "Ngày Đặt",
  "Trạng Thái",
  "Thao tác",
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    fontSize: 15,
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

const orderStatus = [
  {
    text: "Đang chờ xác nhận",
    color: "#1565c0",
  },
  {
    text: "Đã xác nhận",
    color: "",
  },
  {
    text: "Đang vận chuyển",
    color: "#ffeb3b",
  },
  {
    text: "Đã giao hàng",
    color: "#4caf50",
  },
  {
    text: "Đã hủy",
    color: "#f44336",
  },
];

const ListOrder = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);
  const [orders, setOrders] = useState([]);

  const [sort, setSort] = useState("Tất cả các đơn hàng");

  const handleGetOrderById = (orderId) => {
    dispatch(getOrderById(orderId));
  };

  const handleFindOrderById = (event) => {
    event.preventDefault()
 
    const data = new FormData(event.currentTarget)
    if(data.get("orderId") != ""){
      dispatch(getOrderById(data.get("orderId")))
      setOrders([order.order])
    }else{
      setOrders(order.orders)
    }
   
  }

  const handleSortOrder = (event) => {
    const typeSort = event.target.value;
    setSort(typeSort);
    if (typeSort === "Tất cả các đơn hàng") {
      setOrders(order.orders);
    } else {
      const ordersNew = order.orders.filter(
        (item) => item.orderStatus === typeSort
      );
      setOrders(ordersNew);
      console.log(orders);
    }
  };

  useEffect(() => {
    if (!order.orders || order.orders.length === 0) {
      // Nếu chưa tồn tại hoặc là mảng rỗng, gọi action creator `getOrdersAll` để lấy danh sách orders
      dispatch(getOrdersAll());
    } else {
      // Nếu `order.orders` đã tồn tại, cập nhật state `orders`
      setOrders(order.orders);
    }
  }, [dispatch, order.orders]);
  

  return (
    <div className="listOrder">
      <h2 className="listOrder--title">Quản lý đơn hàng</h2>
      <div className="listOrder--content">
        <div className="layer"></div>
        <div className="listOrder--content--filter">
          <div className="listOrder--content--filter--sort">
            <label>Sắp xếp theo </label>
            <Select value={sort} onChange={handleSortOrder}>
              <MenuItem value={"Tất cả các đơn hàng"}>
                Tất cả các đơn hàng
              </MenuItem>
              <MenuItem value={"Đang chờ xác nhận"}>Đang chờ xác nhận</MenuItem>
              <MenuItem value={"Đã xác nhận"}>Đã xác nhận</MenuItem>
              <MenuItem value={"Đang vận chuyển"}>Đang vận chuyển</MenuItem>
              <MenuItem value={"Đã giao hàng"}>Giao hàng thành công</MenuItem>
              <MenuItem value={"Đã hủy"}>Đã hủy</MenuItem>
            </Select>
          </div>
          <form className="listOrder--content--filter--find" method="POST" onSubmit={handleFindOrderById}>
            <TextField label="Mã đơn hàng" name="orderId"></TextField>
            <Button variant="contained" color="error" type="submit">
              Lọc
            </Button>
          </form>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {head.map((item) => (
                  <StyledTableCell>{item}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((item) => (
                <StyledTableRow>
                  <StyledTableCell>{item.id}</StyledTableCell>
                  <StyledTableCell>{item.user.name}</StyledTableCell>
                  <StyledTableCell>{item.user.email}</StyledTableCell>
                  <StyledTableCell>{item.createAt}</StyledTableCell>
                  <StyledTableCell>
                    <Typography
                      component={"span"}
                      sx={{
                        backgroundColor: orderStatus.find(
                          (status) => status.text === item.orderStatus
                        )?.color,
                        color: "#fff",
                        fontSize: "1.4rem",
                        padding: "0.5rem 1rem",
                        borderRadius: "3rem",
                      }}
                    >
                      {item.orderStatus}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Link to="/admin/order/info">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleGetOrderById(item.id)}
                      >
                        Xem
                      </Button>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ListOrder;
