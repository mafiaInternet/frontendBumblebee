import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, Grid, tableCellClasses, Box, Paper } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../state/order/Action";
import { FormatDateTime, Price } from "../../../config/config";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    fontSize: 15
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  boxShadow: "none",
  padding: theme.spacing(1),
}));

const head = ["Sản phẩm", "Giá", "Số lượng", "Thành tiền"];
const OrderInfomation = () => {
  const { order } = useSelector((store) => store.order);
  const dispatch = useDispatch();
  const param = useParams();

  console.log(order)

  useEffect(() => {
    dispatch(getOrderById(param.name));
  }, [param.name]);

  return (
    order && (
      <div>
        <Box sx={{display: { xs: "none", md: "block" }}} className="order--information">
          <div className="container">
            <div className="order--information--content">
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Item>
                    <div className="order--information--content--top">
                      <p>
                        <Typography sx={{ fontWeight: "bold" }} component={"span"}>
                          #{order.id}
                        </Typography>
                        <Typography
                          component={"span"}
                          sx={{
                            backgroundColor: orderStatus.find((item) => item.text === order.orderStatus)?.color,
                            marginLeft: "1rem",
                          }}
                          className="orderInformation--content--head--status"
                        >
                          {order.orderStatus}
                        </Typography>
                      </p>
                      <span>
                        Ngày mua:{" "} <FormatDateTime time={order.createAt}/>
                      </span>
                    </div>
                    <Box
                      sx={{
                        display: { xs: "none", md: "flex" },
                        backgroundColor: order.orderStatus === "Hoàn tất" ? "rgba(227, 250, 218, 0.5)" : "rgba(201, 240, 255, 0.5)",
                      }}
                      className="order--information--content--status"
                    >
                      <Box className="order--information--content--status--view">
                        <div className="order--information--content--status--view--icon">
                          <img loading="lazy" className="img-fluid"
                            src={`https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/order_${order.orderStatus == "Hoàn tất" ? "green" : "blue"}.png`}
                          />
                        </div>
                        <div className="order--information--content--status--view--text">
                          <strong>Đơn hàng mới</strong>
                          <p>18/06/2024 - 15:02</p>
                        </div>
                        <Box sx={{ color: "#2489F4", textAlign: "center", fontSize: "2.2rem" }}>
                          ......
                        </Box>
                      </Box>
                      <Box className="order--information--content--status--view">
                        <div className="order--information--content--status--view--icon">
                          <img loading="lazy" className="img-fluid"
                            src={`https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/process_${
                              order.orderStatus == "Hoàn tất" ? "green" : `${ order.orderStatus == "Đang chờ xác nhận" ? "silver" : "blue"}` }.png`}
                          />
                        </div>
                        <div className="order--information--content--status--view--text">
                          <strong>Đang xử lý</strong>
                          <p>18/06/2024 - 15:02</p>
                        </div>
                        <Box
                          sx={{ 
                            color: order.orderStatus == "Hoàn tất" ? "#29a72a" : "#CDCFD0",
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
                          <img loading="lazy" className="img-fluid"
                            src={`https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/success_${ order.orderStatus == "Hoàn tất" ? "green" : "silver" }.png`}
                          />
                        </div>
                        <div className="order--information--content--status--view--text">
                          <strong>Hoàn tất</strong>
                          <p>18/06/2024 - 15:02</p>
                        </div>
                        <Box
                          sx={{
                            color: order.orderStatus == "Hoàn tất" ? "#29a72a" : "#CDCFD0",
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
                        <p>{order.address.name}</p>
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
                          <strong>
                            <Price price={order.totalPrice - 20000}></Price>
                          </strong>
                        </p>
                        <p>
                          <span>Phí vận chuyển:</span>
                          <strong>20.000đ</strong>
                        </p>
                        {order.discount != 0 && (
                          <p>
                            <span>Giảm giá:</span>
                            <strong>
                              <Price price={order.discount}></Price>
                            </strong>
                          </p>
                        )}
                        <p>
                          <strong>Tổng số tiền (gồm VAT):</strong>
                          <b>
                            <Price price={order.totalPrice}></Price>
                          </b>
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
                        <span>#{order.id}</span>
                      </Box>
                      <div>
                        <Link to={""}>Tra cứu vận chuyển</Link>
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
                            marginLeft: "1rem",
                          }}
                        >
                          {order.orderStatus}
                        </Typography>
                      </div>
                    </Box>
                    <Box
                      sx={{
                        display: { xs: "none", md: "flex" },
                        backgroundColor:
                          order.orderStatus === "Hoàn tất"
                            ? "rgba(227, 250, 218, 0.5)"
                            : "rgba(201, 240, 255, 0.5)",
                      }}
                      className="order--information--content--status "
                    >
                      <Box className="order--information--content--status--view">
                        <div className="order--information--content--status--view--icon icon">
                          <img loading="lazy"
                            className="img-fluid"
                            src={`https://www.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/icon_processing_status_${
                              order.orderStatus == "Hoàn tất" ? "green" : "blue"
                            }.svg`}
                          ></img>
                        </div>
                        <div className="order--information--content--status--view--text">
                          <p>Đang xác nhận</p>
                        </div>
                        <Box
                          sx={{
                            color:
                              order.orderStatus != "Hoàn tất"
                                ? "#2489F4"
                                : "#29a72a",
                            textAlign: "center",
                            fontSize: "2.2rem",
                            paddingBottom: "1rem",
                          }}
                        >
                          ......
                        </Box>
                      </Box>
                      <Box className="order--information--content--status--view">
                        <div className="order--information--content--status--view--icon icon">
                          <img loading="lazy"
                            className="img-fluid"
                            src={`https://www.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/icon_pack_status_${
                              order.orderStatus == "Hoàn tất"
                                ? "green"
                                : `${
                                    order.orderStatus == "Đã xác nhận" || order.orderStatus == "Đang vận chuyển"
                                      ? "blue"
                                      : "silver"
                                  }`
                            }.svg`}
                          ></img>
                        </div>
                        <div className="order--information--content--status--view--text">
                          <p>Đang xử lý</p>
                        </div>
                        <Box
                          sx={{
                            color:
                              order.orderStatus == "Hoàn tất"
                                ? "#29a72a"
                                : order.orderStatus == "Đã xác nhận"
                                ? "#CDCFD0"
                                : "#2489F4",
                            textAlign: "center",
                            fontSize: "2.2rem",
                            paddingBottom: "1rem",
                          }}
                        >
                          ......
                        </Box>
                      </Box>
                      <Box className="order--information--content--status--view">
                        <div className="order--information--content--status--view--icon icon">
                          <img loading="lazy"
                            className="img-fluid"
                            src={`https://www.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/icon_delivery_status_${
                              order.orderStatus == "Hoàn tất"
                                ? "green"
                                : `${
                                    order.orderStatus != "Đã xác nhận" && order.orderStatus != "Đang chờ xác nhận"
                                      ? "blue"
                                      : "silver"
                                  }`
                            }.svg`}
                          ></img>
                        </div>
                        <div className="order--information--content--status--view--text">
                          <p>Đang vận chuyển</p>
                        </div>
                        <Box
                          sx={{
                            color:
                              order.orderStatus == "Hoàn tất"
                                ? "#29a72a"
                                : "#CDCFD0",

                            textAlign: "center",
                            fontSize: "2.2rem",
                            paddingBottom: "1rem",
                          }}
                        >
                          ......
                        </Box>
                      </Box>
                      <Box className="order--information--content--status--view">
                        <div className="order--information--content--status--view--icon icon">
                          <img loading="lazy"
                            className="img-fluid"
                            src={`https://www.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/icon_check_status_${
                              order.orderStatus == "Hoàn tất"
                                ? `${
                                    order.orderStatus == "Đã xác nhận"
                                      ? "blue"
                                      : "green"
                                  }`
                                : "silver"
                            }.svg`}
                          ></img>
                        </div>
                        <div className="order--information--content--status--view--text">
                          <p>Hoàn tất</p>
                        </div>
                        <Box
                          sx={{
                            color:
                              order.orderStatus == "Hoàn tất"
                                ? "#29a72a"
                                : "#CDCFD0",
                            textAlign: "center",
                            fontSize: "2.2rem",
                            paddingBottom: "1rem",
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
                              <StyledTableCell
                                align={item == "Sản phẩm" ? "left" : "center"}
                              >
                                {item}
                              </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.orderItems.map((orderItem, index) => (
                            <TableRow className="order--information--content--card">
                              <StyledTableCell align="left">
                                <div className="order--information--content--card--img">
                                  <img loading="lazy" className="img--fluid" src={orderItem.imageUrl}/>
                                  <p>{orderItem.product.title}</p>
                                </div>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <div className="order--information--content--card--price">
                                  <p>{orderItem.discountedPrice / orderItem.quantity}</p>
                                  <p>{orderItem.price / orderItem.quantity}</p>
                                </div>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                x{orderItem.quantity}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {orderItem.discountedPrice}
                              </StyledTableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <div className="order--information--content--total">
                      <Box sx={{ textAlign: "right" }}>
                        <p>
                          <span>Tạm tính:</span>
                          <strong>
                            <Price price={order.totalPrice - 20000}/>
                          </strong>
                        </p>
                        <p>
                          <span>Phí vận chuyển:</span>
                          <strong>20.000đ</strong>
                        </p>
                        {order.discount > 0 && (
                          <p>
                            <span>Giảm giá:</span>
                            <strong>
                              <Price price={order.discount}></Price>
                            </strong>
                          </p>
                        )}
                        <p>
                          <strong>Tổng tiền:</strong>
                          <b>
                            {" "}
                            <Price
                              price={order.totalPrice - order.discount}
                            ></Price>
                          </b>
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
        <Box
          sx={{ display: { xs: "block", md: "none" } }}
          className="order--information--mobile"
        >
          <div className="order--information--mobile--content">
            <Box className="order--information--content--status--mobile">
              <Box className="order--information--content--status--mobile--top">
                <h3>Đơn hàng đã hoàn tất</h3>
                <span>Yah cảm ơn đã mua hàng</span>
              </Box>
              <Box className="order--information--content--status--mobile--view">
                <div className="order--information--content--status--mobile--view--icon">
                  <img loading="lazy"
                    className="img-fluid"
                    src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/order_blue.png"
                  ></img>
                  <div>
                    <p>Đơn hàng mới</p>

                    <span>18/06/2024 - 15:02</span>
                  </div>
                </div>
                <img loading="lazy" src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/circle_check.svg"></img>
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
                  <img loading="lazy" src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/process_blue.png"></img>
                  <div>
                    <p>Đang xử lý</p>
                    <span>18/06/2024 - 15:02</span>
                  </div>
                </div>
                <img loading="lazy" src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/circle_check.svg"></img>
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
                  <img loading="lazy" src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/success_silver.png"></img>
                  <div>
                    <p>Hoàn tất</p>
                    <span>18/06/2024 - 15:02</span>
                  </div>
                </Box>
                <img loading="lazy" src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/circle_alarm.svg"></img>
              </Box>
            </Box>
            <h3>Thông tin đơn hàng</h3>
            <div className="order--information--mobile--content--box">
              <div>
                <p>
                  <span>Mã đơn hàng:</span>
                  <strong>#{order.id}</strong>
                </p>
                <p>
                  <span>Ngày mua:</span>
                  <strong>
                    <FormatDateTime time={order.createAt}></FormatDateTime>
                  </strong>
                </p>
                <p>
                  <span>Số lượng:</span>
                  <strong>{order.totalItem} sản phẩm</strong>
                </p>
                <p>
                  <strong>Tổng tiền:</strong>
                  <b>
                    <Price price={order.totalPrice}></Price>
                  </b>
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
                  {order.address.name}
                </Typography>
                <Typography component={"strong"} sx={{ paddingLeft: "1rem" }}>
                  {order.address.mobile}
                </Typography>
              </p>
              <p>
                Ngõ 87/10/30 yên xá, tân triều, Phường Văn Quán, Quận Hà Đông,
                Hà Nội, Việt Nam
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
            <Box className="order--information--mobile--content--bottom">
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <span className="tag--pagekage">Mã đơn hàng</span>
                  <strong>#{order.id}</strong>
                </div>
                <Typography
                  component={"span"}
                  sx={{
                    backgroundColor: orderStatus.find(
                      (status) => status.text === order.orderStatus
                    )?.color,
                    color: "#fff",
                    fontSize: "1.2rem",
                    padding: "0.1rem 1rem",
                    borderRadius: "3rem",
                  }}
                >
                  {order.orderStatus}
                </Typography>
              </Box>
              <div className="order--information--mobile--content--icon">
                <img loading="lazy"
                  className="img-fluid"
                  src={`https://www.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/icon_processing_status_${
                    order.orderStatus == "Hoàn tất" ? "green" : "blue"
                  }.svg`}
                ></img>
                <Typography
                  sx={{
                    color:
                      order.orderStatus != "Hoàn tất" ? "#2489F4" : "#29a72a",
                  }}
                  component={"span"}
                >
                  ......
                </Typography>
                <img loading="lazy"
                  className="img-fluid"
                  src={`https://www.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/icon_pack_status_${
                    order.orderStatus == "Hoàn tất"
                      ? "green"
                      : `${
                          order.orderStatus == "Đã xác nhận" || order.orderStatus == "Đang vận chuyển" ? "blue" : "silver"
                        }`
                  }.svg`}
                ></img>
                <Typography
                  sx={{
                    color:
                    order.orderStatus == "Hoàn tất"
                                ? "#29a72a"
                                : "#CDCFD0",
                  }}
                  component={"span"}
                >
                  ......
                </Typography>
                <img loading="lazy"
                  className="img-fluid"
                  src={`https://www.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/icon_delivery_status_${
                    order.orderStatus == "Hoàn tất"
                      ? "green"
                      : `${
                          order.orderStatus != "Đã xác nhận" && order.orderStatus != "Đang chờ xác nhận" ? "blue" : "silver"
                        }`
                  }.svg`}
                ></img>
                <Typography
                  sx={{
                    color:
                      order.orderStatus == "Hoàn tất" ? "#29a72a" : "#CDCFD0",
                  }}
                  component={"span"}
                >
                  ......
                </Typography>
                <img loading="lazy"
                  className="img-fluid"
                  src={`https://www.fahasa.com/skin/frontend/ma_vanese/fahasa/images/order/icon_check_status_${
                    order.orderStatus == "Hoàn tất"
                      ? `${
                          order.orderStatus == "Đã xác nhận" ? "blue" : "green"
                        }`
                      : "silver"
                  }.svg`}
                ></img>
                <Typography
                  sx={{
                    color:
                      order.orderStatus == "Hoàn tất" ? "#29a72a" : "#CDCFD0",
                  }}
                  component={"span"}
                >
                  ......
                </Typography>
              </div>
              {/* <div>Thông tin vận chuyển</div> */}
              <div className="order--information--mobile--content--bottom--list">
                {order.orderItems.map((orderItem) => (
                  <div className="order--information--mobile--content--bottom--list--card">
                    <div className="order--information--mobile--content--bottom--list--card--img">
                      <img loading="lazy" className="img-fluid" src={orderItem.imageUrl}></img>
                    </div>
                    <div className="order--information--mobile--content--bottom--list--card--text">
                      <p className="order--information--mobile--content--bottom--list--card--text--title">
                        thần đồng
                      </p>
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
                            <Price price={orderItem.price}></Price>
                          </Typography>
                          <Typography
                            component={"span"}
                            sx={{
                              color: "#c62828",
                              fontSize: "1.7rem",
                              marginLeft: "1rem",
                            }}
                          >
                            <Price price={orderItem.discountedPrice}></Price>
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
                  <strong>
                    <Price price={order.totalPrice - 20000}/>
                  </strong>
                </p>
                <p>
                  <span>Phí vận chuyển:</span>
                  <strong>20.000đ</strong>
                </p>
                {order.discount > 0 && (
                  <p>
                    <span>Giảm giá:</span>
                    <strong>
                      <Price price={order.discount}></Price>
                    </strong>
                  </p>
                )}
                <p>
                  <strong>Tổng tiền:</strong>
                  <b>
                    <Price price={order.totalPrice - order.discount}></Price>
                  </b>
                </p>
              </div>
            </Box>
          </div>
        </Box>
      </div>
    )
  );
};

export default OrderInfomation;
