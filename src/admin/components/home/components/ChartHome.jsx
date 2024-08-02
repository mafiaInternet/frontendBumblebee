import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrderTotalQuantityOfYear, getOrderTotalPriceOfYear } from "../../../state/action/OrderAction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartHome = () => {
  

  const [year, setYear] = useState(new Date().getFullYear());
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  const options = {};

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Total quantity",
        data: order.totalOrderQuantityOfYear,
        borderColor: "rgb(75, 192, 192)",
        hidden: true,
      },
      {
        label: "Total prices",
        data: order.totalOrderPriceOfYear,
        borderColor: "rgb(75, 192, 192)",
        hidden: false,
      },
    ]
  };
  const handleChange = () => {
    dispatch(getOrderTotalPriceOfYear(year))
      dispatch(getOrderTotalQuantityOfYear(year))
  }
  useEffect(() => 
    {
      dispatch(getOrderTotalPriceOfYear(year))
      dispatch(getOrderTotalQuantityOfYear(year))
    },
    []
  );
  return (
    <div className="chart">
      <h3>Thông kê doanh số</h3>
        <Box sx={{display: "flex", alignItems: "center"}}>
      <Button variant="contained" onClick={handleChange} sx={{marginRight: "1rem"}}>Lọc</Button>
      <TextField label="Năm" onChange={(event) => setYear(event.target.value)}></TextField>

        </Box>
      <Line options={options} data={data}></Line>
    </div>
  );
};

export default ChartHome;
