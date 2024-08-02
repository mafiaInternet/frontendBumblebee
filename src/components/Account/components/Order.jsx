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

export default function Order() {
  const [value, setValue] = React.useState("1");
  const dispatch = useDispatch()
  const {order} = useSelector(store => store)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(order)
  useEffect(() => {
    dispatch(getOrderByUser())
  }, [dispatch])

  return order.orders && (
    <div className="order">
      <h2>Đơn hàng của tôi</h2>
      <Box sx={{backgroundColor:"#f0f0f0"}}>
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
              <Tab label="Tất cả" value="1" />
              <Tab label="Chờ thanh toán" value="2" />
              <Tab label="Đang xử lý" value="3" />
              <Tab label="Đang giao" value="4" />
              <Tab label="Hoàn tất" value="5" />
              <Tab label="Bị hủy" value="6" />
              <Tab label="Đổi trả" value="7" />
            </Tabs>
          </Box>
          <Box>
            <TabPanel sx={{ padding: "0px" }} value="1">
            {order.orders.map((order) => (
              <Link to={`/account/order/${order.id}`}>

<OrderCard></OrderCard>
</Link>
            ))}
              
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </Box>
        </TabContext>
      </Box>
    </div>
  );
}
