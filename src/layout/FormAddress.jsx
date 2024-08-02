import { Box, Button } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";

const FormAddress = (props) => {
  const jwt = localStorage.getItem("jwt");
  const [address, setAddress] = useState({
    lastName: "",
    city: "",
    mobile: "",
    province: {
      data: [],
    },
    district: {
      status: true,
      data: [],
    },
    ward: {
      status: true,
      data: [],
    },
    desc: "",
    state: "",
  });

  const handleGetApiAddress = async (event) => {
    const type = event.target.name;
    if (type === "province") {
      const province = JSON.parse(event.target.value);

      try {
        const { data } = await axios.get(
          `https://vapi.vnappmob.com/api/province/district/${province.province_id}`
        );

        setAddress({
          ...address,
          district: { ...address.district, data: data.results, status: false },
        });
      } catch (error) {
        console.error(error.message);
      }
    } else if (type === "district") {
      const district = JSON.parse(event.target.value);
      try {
        const { data } = await axios.get(
          `https://vapi.vnappmob.com/api/province/ward/${district.district_id}`
        );

        setAddress({
          ...address,
          ward: { ...address.ward, data: data.results, status: false },
        });
      } catch (error) {
        console.error("Error: ", error.message);
      }
    }
  };

  useEffect(() => async () => {
    try {
      const { data } = await axios.get(
        "https://vapi.vnappmob.com/api/province/"
      );
      setAddress({
        ...address,
        province: { data: data.results },
        district: { data: [], status: true },
        ward: { data: [], status: true },
      });
    } catch (error) {
      console.error(error.message);
    }
    setAddress({
      ...address,
      lastName: props.address.lastName || "",
      city: props.address.city || "",
      mobile: props.address.mobile || "",
    });
  });
  const [state, setState] = useState({ lastName: "", city: "" });
  return (
    <Box sx={{ width: "100%" }}>
      <form method="POST" onSubmit={props.submit}>
        <h4>THAY ĐỔI ĐỊA CHỈ GIAO HÀNG</h4>
        <hr></hr>
        <div className="form-group">
          <label>Họ và tên người nhân</label>
          <input
            type="text"
            name="name"
            value={state.lastName}
            onChange={(event) =>
              setState({ ...state, lastName: event.target.value })
            }
            placeholder="Họ và tên"
          ></input>
        </div>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="mobile"
            value={address.mobile}
            placeholder="Số điện thoại"
          ></input>
        </div>
        <div className="form-group">
          <label>Tỉnh/ Thành phố</label>
          <select name="province" onChange={handleGetApiAddress}>
            <option>Chọn tỉnh/ Thành phố</option>
            {address.province.data &&
              address.province.data.map((item, index) => (
                <option value={JSON.stringify(item)} key={index}>
                  {item.province_name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label>Quận/ Huyện</label>
          <select
            name="district"
            disabled={address.district.status}
            onChange={handleGetApiAddress}
          >
            <option>Chọn quận/ huyện</option>
            {!address.district.status &&
              address.district.data.map((item, index) => (
                <option value={JSON.stringify(item)} data={item.district_name} key={index}>
                  {item.district_name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label>Phường/ Xã</label>
          <select
            name="ward"
            disabled={address.ward.status}
            onChange={handleGetApiAddress}
          >
            <option>Chọn phường xã</option>
            {!address.ward.status &&
              address.ward.data.map((item, index) => (
                <option value={item.ward_id} data={item.ward_name} key={index}>
                  {item.ward_name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label>Địa chỉ cụ thể</label>
          <input
            type="text"
            name="desc"
            value={address.desc}
            multiple
            placeholder="Địa chỉ cụ thể"
          ></input>
        </div>
   
          <div className="form-group">
          <Button
              variant="outlined"
              color="error"
              onClick={() => props.handleClose(false)}
            >
              Hủy
            </Button>
            <Button variant="contained" color="error">
              Xác nhận
            </Button>
           
          </div>

      </form>

    </Box>
  );
};

export default FormAddress;
