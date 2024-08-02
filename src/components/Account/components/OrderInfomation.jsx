import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  Grid,
  tableCellClasses,
  Box,
  Paper,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import AlarmIcon from "@mui/icons-material/Alarm";
import FeedIcon from "@mui/icons-material/Feed";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../state/order/Action";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    fontSize: 15,
    // textAlign: "center"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    // textAlign: "center"
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  boxShadow: "none",
  padding: theme.spacing(1),
}));

const head = ["Sản phẩm", "Giá", "Số lượng", "Thành tiền"];
const OrderInfomation = () => {
  const {order} = useSelector(store => store.order)
  const dispatch = useDispatch()
  const param = useParams()
  console.log(order)
  useEffect(() => {
    dispatch(getOrderById(param.name))
  }, [param.name])
  return order && (
  <div>
    <Box sx={{display: {xs: "none", md: "block"}}}  className="order--information">
      <div className="container">
        <div className="order--information--content">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Item>
                <div className="order--information--content--top">
                  <p>
                    <Typography sx={{ fontWeight: "bold" }} component={"span"}>
                      #1034759
                    </Typography>
                    <Typography
                      component={"span"}
                      sx={{
                        borderRadius: "3rem",
                        backgroundColor: "green",
                        marginLeft: "1rem",
                        padding: "0.5rem 1rem",
                        color: "white",
                      }}
                    >
                      Hoàn tất
                    </Typography>
                  </p>
                  <span>Ngày mua: 18/06/2024 - 15:02</span>
                </div>
                <Box
                  sx={{ display: { xs: "none", md: "flex" } }}
                  className="order--information--content--status"
                >
                  <Box className="order--information--content--status--view">
                    <div className="order--information--content--status--view--icon">
                      <img></img>
                    </div>
                    <div className="order--information--content--status--view--text">
                      <strong>Đơn hàng mới</strong>
                      <p>18/06/2024 - 15:02</p>
                    </div>
                    <Box
                      sx={{
                        color: "#29a72a",
                        textAlign: "center",
                        fontSize: "2.2rem",
                        padding: " 0 2.5rem 1rem",
                      }}
                    >
                      ......
                    </Box>
                  </Box>
                  <Box className="order--information--content--status--view">
                    <div className="order--information--content--status--view--icon">
                      <img></img>
                    </div>
                    <div className="order--information--content--status--view--text">
                      <strong>Đơn xử lý</strong>
                      <p>18/06/2024 - 15:02</p>
                    </div>
                    <Box
                      sx={{
                        color: "#29a72a",
                        textAlign: "center",
                        fontSize: "2.2rem",
                        padding: " 0 2.5rem 1rem",
                      }}
                    >
                      ......
                    </Box>
                  </Box>
                  <Box className="order--information--content--status--view">
                    <div className="order--information--content--status--view--icon">
                      <img></img>
                    </div>
                    <div className="order--information--content--status--view--text">
                      <strong>hoàn tất</strong>
                      <p>18/06/2024 - 15:02</p>
                    </div>
                    <Box
                      sx={{
                        color: "#29a72a",
                        textAlign: "center",
                        fontSize: "2.2rem",
                        padding: " 0 2.5rem 1rem",
                      }}
                    >
                      ......
                    </Box>
                  </Box>
                </Box>

                <div className="order--information--content--box">
                  <div className="order--information--content--box--card">
                    <h4>Thông tin người nhận</h4>
                    <p>{order.address.lastName}</p>
                    <p>Tel: {order.address.mobile}</p>
                    <p>{order.address.city}</p>
                    <p>Phường Văn Quán, Quận Hà Đông, Hà Nội, Việt Name</p>
                  </div>
                  <div className="order--information--content--box--card">
                    <h4>Phương thức thanh toán</h4>
                    <p>{order.paymentDetails.paymentMethod}</p>
                  </div>
                  <div className="order--information--content--box--card">
                    <h4>Tổng tiền</h4>
                    <p>
                      <span>Tạm tính:</span>
                      <strong>{order.totalPrice}đ</strong>
                    </p>
                    <p>
                      <span>Phí vận chuyển:</span>
                      <strong>20.000đ</strong>
                    </p>
                    {order.discount != 0 && <p>
                      <span>Giảm giá:</span>
                      <strong>{order.discount}.000đ</strong>
                    </p>}
                    
                    <p>
                      <strong>Tổng số tiền (gồm VAT):</strong>
                      <b>{order.totalPrice}.000đ</b>
                    </p>
                  </div>
                </div>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <h4>Phương thức vận chuyển</h4>
                <p>Giao hàng tiêu chuẩn</p>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <h4>Ghi chú</h4>
                <p>(Không có)</p>
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <Box className="order--information--content--top">
                  <Box sx={{ display: "flex" }}>
                    <div className="tag--pagekage">Mã đơn hàng</div>
                    <span>#1034759</span>
                  </Box>
                  <div>
                    <Link to={""}>Tra cứu vận chuyển</Link>
                    <Typography
                      component={"span"}
                      sx={{
                        borderRadius: "3rem",
                        backgroundColor: "green",
                        marginLeft: "1rem",
                        padding: "0.5rem 1rem",
                        color: "white",
                      }}
                    >
                      Hoàn tất
                    </Typography>
                  </div>
                </Box>
                <Box
                  sx={{ display: { xs: "none", md: "flex" } }}
                  className="order--information--content--status"
                >
                  <Box className="order--information--content--status--view">
                    <div className="order--information--content--status--view--icon">
                      <img></img>
                    </div>
                    <div className="order--information--content--status--view--text">
                      <strong>Đơn hàng mới</strong>
                      <p>18/06/2024 - 15:02</p>
                    </div>
                    <Box
                      sx={{
                        color: "#29a72a",
                        textAlign: "center",
                        fontSize: "2.2rem",
                        padding: " 0 2.5rem 1rem",
                      }}
                    >
                      ......
                    </Box>
                  </Box>
                  <Box className="order--information--content--status--view">
                    <div className="order--information--content--status--view--icon">
                      <img></img>
                    </div>
                    <div className="order--information--content--status--view--text">
                      <strong>Đơn xử lý</strong>
                      <p>18/06/2024 - 15:02</p>
                    </div>
                    <Box
                      sx={{
                        color: "#29a72a",
                        textAlign: "center",
                        fontSize: "2.2rem",
                        padding: " 0 2.5rem 1rem",
                      }}
                    >
                      ......
                    </Box>
                  </Box>
                  <Box className="order--information--content--status--view">
                    <div className="order--information--content--status--view--icon">
                      <img></img>
                    </div>
                    <div className="order--information--content--status--view--text">
                      <strong>hoàn tất</strong>
                      <p>18/06/2024 - 15:02</p>
                    </div>
                    <Box
                      sx={{
                        color: "#29a72a",
                        textAlign: "center",
                        fontSize: "2.2rem",
                        padding: " 0 2.5rem 1rem",
                      }}
                    >
                      ......
                    </Box>
                  </Box>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {head.map((item) => (
                          <StyledTableCell align={item == "Sản phẩm" ? "left" : "center"}>{item}</StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {order.orderItems.map((orderItem, index) => (
                      <TableRow className="order--information--content--card">
                        <StyledTableCell align="left" >
                        <div className="order--information--content--card--img">
                          <img className="img--fluid" src={orderItem.imageUrl}></img>
                          <p>
                            {orderItem.product.title}
                          </p>
                        </div>
                          
                        </StyledTableCell>
                        <StyledTableCell align="center">
                        <div className="order--information--content--card--price">
                          <p>{orderItem.discountedPrice}</p>
                          <p>{orderItem.price}</p>

                        </div>
                        </StyledTableCell>
                        <StyledTableCell align="center">{orderItem.quantity}</StyledTableCell>
                        <StyledTableCell align="center">{orderItem.discountedPrice * orderItem.quantity}</StyledTableCell>
                      </TableRow>
                    ))}
                     
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="order--information--content--total">
                  <Box sx={{ textAlign: "right" }}>
                  <p>
              <span>Tạm tính:</span>
              <strong>{order.totalPrice}.000đ</strong>
            </p>
            <p>
              <span>Phí vận chuyển:</span>
              <strong>20.000đ</strong>
            </p>
            {order.discount > 0 &&  <p>
              <span>Giảm giá:</span>
              <strong>{order.discount}.000đ</strong>
            </p>}
           
            <p>
              <strong>Tổng tiền:</strong>
              <b>1550.500đ</b>
            </p>
                  </Box>
                </div>
              </Item>
            </Grid>
          </Grid>

          <div></div>
        </div>
      </div>
    </Box>
    <Box sx={{display: {xs: "block", md: "none"}}} className="order--information--mobile">
      <div className="order--information--mobile--content">
        <Box className="order--information--content--status--mobile">
          <Box className="order--information--content--status--mobile--top">
            <h3>Đơn hàng đã hoàn tất</h3>
            <span>Yah cảm ơn đã mua hàng</span>
          </Box>
          <Box className="order--information--content--status--mobile--view">
            <div className="order--information--content--status--mobile--view--icon">
              <img
                className="img-fluid"
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/order_blue.png"
              ></img>
              <div>
                <p>Đơn hàng mới</p>
                <span>18/06/2024 - 15:02</span>
              </div>
            </div>
            <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/circle_check.svg"></img>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "1.4rem",
            }}
          >
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </Box>
          <Box className="order--information--content--status--mobile--view">
            <div className="order--information--content--status--mobile--view--icon">
              <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/process_blue.png"></img>
              <div>
                <p>Đang xử lý</p>
                <span>18/06/2024 - 15:02</span>
              </div>
            </div>
            <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/circle_check.svg"></img>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "1.4rem",
            }}
          >
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </Box>
          <Box className="order--information--content--status--mobile--view">
            <Box className="order--information--content--status--mobile--view--icon">
              <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/success_silver.png"></img>
              <div>
                <p>Hoàn tất</p>
                <span>18/06/2024 - 15:02</span>
              </div>
            </Box>
            <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/circle_alarm.svg"></img>
          </Box>
        </Box>
        <h3>Thông tin đơn hàng</h3>
        <div className="order--information--mobile--content--box">
          <div>
            <p>
              <span>Mã đơn hàng:</span>
              <strong>#1034759</strong>
            </p>
            <p>
              <span>Ngày mua:</span>
              <strong>18/06/2024 - 15:02</strong>
            </p>
            <p>
              <span>Số lượng:</span>
              <strong>{order.totalItem} sản phẩm</strong>
            </p>
            <p>
              <strong>Tổng tiền:</strong>
              <b>{order.totalPrice}.000 đ</b>
            </p>
          </div>
        </div>
        <h3>Thông tin người nhận</h3>
        <div className="order--information--mobile--content--box">
          <p>
            <Typography
              component={"strong"}
              sx={{
                borderRight: "1px solid silver",
                fontWeight: "bold",
                paddingRight: "1rem",
              }}
            >
              {order.address.lastName}
            </Typography>
            <Typography component={"strong"} sx={{ paddingLeft: "1rem" }}>
              {order.address.mobile}
            </Typography>
          </p>
          <p>
            Ngõ 87/10/30 yên xá, tân triều, Phường Văn Quán, Quận Hà Đông, Hà
            Nội, Việt Nam
          </p>
        </div>
        <h3>Phương thức thanh toán</h3>
        <div className="order--information--mobile--content--box">
          <p>{order.paymentDetails.paymentMethod}</p>
        </div>
        <h3>Phương thức vận chuyển</h3>
        <div className="order--information--mobile--content--box">
          <p>Giao hàng tiêu chuẩn</p>
        </div>
        <h3>Ghi chú</h3>
        <div className="order--information--mobile--content--box">
          <p>(Không có)</p>
        </div>
        <h3>lịch sử đơn hàng</h3>
        <div className="order--information--mobile--content--box">
          <p>abc</p>
        </div>
        <Box className="order--information--mobile--content--bottom">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <div className="tag--pagekage">Mã đơn hàng</div>
            <Typography
              component={"span"}
              sx={{ color: "blue", fontSize: "1.2rem" }}
            >
              Đang xử lý
            </Typography>
          </Box>
          <div className="order--information--mobile--content--icon">
            <img src="https://www.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/icon_processing_status_blue.svg"></img>
            <span>......</span>
            <img src="https://www.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/icon_pack_status_blue.svg"></img>
            <span>......</span>
            <img src="https://www.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/icon_delivery_status_silver.svg"></img>
            <span>......</span>
            <img src="https://www.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/icon_check_status_silver.svg"></img>
            <span>......</span>
          </div>
          {/* <div>Thông tin vận chuyển</div> */}
          <div className="order--information--mobile--content--bottom--list">
          {order.orderItems.map((orderItem) => (
            <div className="order--information--mobile--content--bottom--list--card">
            <div className="order--information--mobile--content--bottom--list--card--img">
              <img className="img-fluid" src={orderItem.imageUrl}></img>

            </div>
              <div className="order--information--mobile--content--bottom--list--card--text">
                <p className="order--information--mobile--content--bottom--list--card--text--title">thần đồng</p>
                <Box sx={{ textAlign: "right" }}>
                  <p>x{orderItem.quantity}</p>
                  <p>
                    <Typography
                      component={"span"}
                      sx={{
                        textDecoration: "line-through",
                        color: "silver",
                        fontSize: "1.3rem",
                      }}
                    >
                      {orderItem.price}.000đ
                    </Typography>
                    <Typography
                      component={"span"}
                      sx={{
                        color: "#c62828",
                        fontSize: "1.7rem",
                        marginLeft: "1rem",
                      }}
                    >
                      {orderItem.discountedPrice}.000đ
                    </Typography>
                  </p>
                </Box>
              </div>
            </div>
          ))}
          </div>
          <div className="order--information--mobile--content--bottom--total">
            <p>
              <span>Tạm tính:</span>
              <strong>{order.totalPrice}.000đ</strong>
            </p>
            <p>
              <span>Phí vận chuyển:</span>
              <strong>20.000đ</strong>
            </p>
            {order.discount > 0 &&  <p>
              <span>Giảm giá:</span>
              <strong>{order.discount}.000đ</strong>
            </p>}
            <p>
              <strong>Tổng tiền:</strong>
              <b>1550.500đ</b>
            </p>
          </div>
        </Box>
      </div>
    </Box>
    </div>
  );
};

export default OrderInfomation;
