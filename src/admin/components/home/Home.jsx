import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../state/product/Action";
import {getOrdersByAdmin, getOrderTopMonth, getOrderTopWeek, getOrderTopYear } from "../../../state/order/Action";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

import ChartHome from "./components/ChartHome";
import ListOrderNeedComfirm from "./components/ListOrderNeedComfirm";
import { Price } from "../../../config/config";

const Home = () => {
  const dispatch = useDispatch();
  const { products, order, customer } = useSelector((store) => store);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getOrdersByAdmin());
    dispatch(getOrderTopWeek());
    dispatch(getOrderTopMonth());
    dispatch(getOrderTopYear());
    if (order.orders.length > 0) {
      let value = 0;
      order.orders.forEach((element) => {
        value += element.totalPrice;
      });
      setTotal(value);
    }
  }, [dispatch, total]);

  return products.products &&
    order.orders &&
    order.ordersTopCategory &&
    order.totalOrderPriceOfYear &&
    order.totalOrderQuantityOfYear &&
    customer.customers ? (
    <div className="admin--home">
      <h2 className="admin--home--title">Admin Dashboard</h2>
      <div className="admin--home--content">
        <div className="layer"></div>
        <div className="admin--home--content--quantity">
          <Grid container spacing={2}>
            <Grid item xs={3} container>
              <Grid sx={{ backgroundColor: "#dc3545" }} item xs={4}>
                <div className="admin--home--content--quantity--icon">
                  <ShoppingCartIcon style={{ fontSize: "40px" }} />
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="admin--home--content--quantity--info">
                  <p>Đơn hàng</p>
                  <strong>{order.orders.length}</strong>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={3} container>
              <Grid sx={{ backgroundColor: "green" }} item xs={4}>
                <div className="admin--home--content--quantity--icon">
                  <AttachMoneyIcon style={{ fontSize: "40px" }} />
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="admin--home--content--quantity--info">
                  <p>Tổng doanh thu</p>
                  <strong>
                    <Price price={total}></Price>
                  </strong>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={3} container>
              <Grid sx={{ backgroundColor: "#1565c0" }} item xs={4}>
                <div className="admin--home--content--quantity--icon">
                  <FullscreenExitIcon style={{ fontSize: "40px" }} />
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="admin--home--content--quantity--info">
                  <p>Sản phẩm</p>
                  <strong>{products.products.length}</strong>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <ListOrderNeedComfirm orders={order.orders}></ListOrderNeedComfirm>
        <Grid container spacing={1}>
          <Grid item xs={7}>
            <div className="admin--home--content--chart">
              <ChartHome style={{ fontSize: "40px" }} />
            </div>
          </Grid>
          <Grid item xs={5}>
            <div className="admin--home--content--customer">
              <h3
                className="admin--home--content--customer--title"
                style={{ fontSize: "24px", marginBottom: "40px" }}
              >
                Top sản phẩm bán chạy
              </h3>
              <div className="admin--home--content--customer--card">
                {order.ordersTopCategory
                  .sort((a, b) => b.totalPrice - a.totalPrice)
                  .map((item, index) => (
                    <Grid
                      container
                      spacing={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                          index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                        marginBottom: "20px",
                      }}
                    >
                      <Grid item xs={2}>
                        <p className="admin--home--content--customer--card--stt">
                          {index + 1}
                        </p>
                      </Grid>
                      <Grid sx={{ alignItems: "center" }} item xs={10}>
                        <strong>{item.name}</strong>
                        <Box>
                          <p>Đã bán: {item.totalQuantity}</p>
                          <p>
                            Tổng: <Price price={item.totalPrice}></Price>
                          </p>
                        </Box>
                      </Grid>
                    </Grid>
                  ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Home;
