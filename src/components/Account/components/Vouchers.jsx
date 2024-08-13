import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import Voucher from "../../../layout/Voucher";
import { handleGetVouchers } from "../../../state/voucher/Action";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");
  const dispath = useDispatch();
  const { voucher } = useSelector((store) => store);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    dispath(handleGetVouchers())
  }, [dispath])

  return (
    <div className="account--vouchers">

    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", backgroundColor: "white" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Voucher của tôi" value="1" />
            <Tab label="Voucher của đối tác" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: "0" }}>
          <Box sx={{ margin: "1rem 0" }}>
          {voucher && voucher.vouchers && voucher.vouchers.map((item, index) =>(
            <Voucher voucher={item} key={index}></Voucher>

          ))}
          </Box>

        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </Box>
    </div>
  );
}
