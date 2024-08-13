import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, updateAddressByUser } from "../state/address/Action";

const FormAddress = (props) => {
  const jwt = localStorage.getItem("jwt");
  console.log(props);
  const dispatch = useDispatch();
  const handleAddress = (event, type) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const request = {
      name: data.get("name"),
      mobile: data.get("mobile"),
      province: JSON.parse(data.get("province")).province_name,
      district: JSON.parse(data.get("district")).district_name,
      ward: JSON.parse(data.get("ward")).ward_name,
      description: data.get("desc"),
      state: data.get("state") == "true" ? "Mặc định" : "",
    };
    
    console.log(type);
    console.log(request);

    if (type === "create") {
      dispatch(addAddress(request));
    } else if (type === "update") {
      dispatch(
        updateAddressByUser({
          addressId: props.address.id,
          responseData: request,
        })
      );
    }
  };

  const [address, setAddress] = useState({
    name: props.address.name,
    mobile: props.address.mobile,
    province: {
      status: true,
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
    state: false,
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

  useEffect(
    () => async () => {
      try {
        const { data } = await axios.get(
          "https://vapi.vnappmob.com/api/province/"
        );
        setAddress({
          ...address,
          province: { data: data.results, status: false },
          district: { data: [], status: true },
          ward: { data: [], status: true },
        });
        console.log(address);
      } catch (error) {
        console.error(error.message);
      }
    },
    []
  );
  console.log(address);
  return (
    <Box sx={{ width: "100%" }}>
      <form
        method="POST"
        onSubmit={(event) => handleAddress(event, props.type)}
      >
        <h4>{props.title}</h4>
        <hr></hr>
        <div className="form-group">
          <label>Họ và tên người nhận</label>
          <input
            type="text"
            name="name"
            value={address.name}
            onChange={(event) =>
              setAddress({ ...address, name: event.target.value })
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
            onChange={(event) =>
              setAddress({ ...address, mobile: event.target.value })
            }
            placeholder="Số điện thoại"
          ></input>
        </div>
        <div className="form-group">
          <label>Tỉnh/ Thành phố</label>
          <select name="province" onChange={handleGetApiAddress}>
            <option>Chọn tỉnh/ Thành phố</option>
            {!address.province.status &&
              address.province.data &&
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
                <option
                  value={JSON.stringify(item)}
                  data={item.district_name}
                  key={index}
                >
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
                <option value={JSON.stringify(item)} data={item.ward_name} key={index}>
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
            value={props.address.desc}
            onChange={(event) =>
              setAddress({ ...address, desc: event.target.value })
            }
            multiple
            placeholder="Địa chỉ cụ thể"
          ></input>
        </div>
  
          <FormControlLabel
            control={
              <Checkbox
                value={address.state}
                name="state"
                onChange={() =>
                  setAddress({ ...address, state: !address.state })
                }
                fullWidth
              ></Checkbox>
            }
            label="Đặt làm mặc định"
          ></FormControlLabel>
 
 
        {jwt && (
          <div className="form-group">
            <Button
              variant="outlined"
              color="error"
              onClick={() => props.handleClose(false)}
            >
              Hủy
            </Button>
            <Button type="submit" variant="contained" color="error">
              Xác nhận
            </Button>
          </div>
        )}
      </form>
    </Box>
  );
};

export default FormAddress;
