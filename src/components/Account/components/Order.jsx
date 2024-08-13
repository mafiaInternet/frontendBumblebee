import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OrderCard from "./OrderCard";
import { Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderByUser } from "../../../state/order/Action";
import { Link } from "react-router-dom";

const orderStatus = [
  "Tất cả",
  "Chờ thanh toán",
  "Đang xử lý",
  "Đang vận chuyển",
  "Hoàn tất",
  "Bị hủy",
  "Đổi trả",
];
export default function Order() {
  const [value, setValue] = React.useState("1");
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(order);
  useEffect(() => {
    dispatch(getOrderByUser());
  }, [dispatch]);

  return (
    order.orders && (
      <div className="order">
        <h2>Đơn hàng của tôi</h2>
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
                // aria-label="lab API tabs example"
              >
                {orderStatus.map((item, index) => (
                  <Tab label={item} value={item} key={index}></Tab>
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
                          a.orderStatus == item ||
                          (item === "Đang xử lý" &&
                            (a.orderStatus === "Đang chờ xác nhận" ||
                              a.orderStatus === "Đã xác nhận")) || (item === "Tất cả")
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
