import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import OrderCard from "./OrderCard";
import { Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrdersByUser } from "../../../state/order/Action";
import { Link } from "react-router-dom";

const orderStatus = [
  "Tất cả",
  "Chờ thanh toán",
  "Đang xử lý",
  "Đã xác nhận",
  "Đang vận chuyển",
  "Hoàn tất",
  "Đã hủy"
];

export default function Order() {
  const [value, setValue] = React.useState("Tất cả");
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(getOrdersByUser());
  }, [dispatch]);

  return (
    order.orders && (
      <div className="order">
        <h2 style={{fontSize: "24px", fontWeight: "500"}}>ĐƠN HÀNG CỦA TÔI</h2>
        <hr></hr>
        <Box sx={{ backgroundColor: "#f0f0f0" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderColor: "divider",
                backgroundColor: "white",
                borderRadius: "0.5rem",
              }}
            >
              <Tabs
                className="order--tablist"
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
              >
                {orderStatus.map((item, index) => (
                  <Tab label={item} value={item} key={index}
                    sx={{
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                        color: "red",
                      }
                    }}
                  />
                ))}
              </Tabs>
            </Box>
              <div>
              {orderStatus.map((item, index) => (
                <TabPanel sx={{padding: "0"}} value={item} key={index}>
                  {order &&
                    order.orders &&
                    order.orders
                      .filter(
                        (a) =>
                          item == 'Tất cả' ? true : a.orderStatus == item
                      )
                      .map((b) => (
                        <Link
                          style={{ color: "black", textDecoration: "none" }}
                          to={`/account/order/${b.id}`}
                        >
                          <OrderCard order={b}></OrderCard>
                        </Link>
                      ))}
                </TabPanel>
              ))}
              </div>
          </TabContext>
        </Box>
      </div>
    )
  );
}
