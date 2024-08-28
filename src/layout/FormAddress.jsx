import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, updateAddressByUser } from "../state/address/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  height: 580,
  bgcolor: "background.paper",
  border: "1px solid silver",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px"
};

const inputs = {
  padding: "17px 0 17px 14px", 
  fontSize: "16px", 
  borderRadius: "5px", 
  width: "100%",
  border: "1px solid silver"
}

const FormAddress = (props) => {
  const jwt = localStorage.getItem("jwt");
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

  return (
    <Box sx={style}>

      <form
        method="POST"
        onSubmit={(event) => handleAddress(event, props.type)}
      >

        <h2 style={{fontSize: "24px", fontWeight: "500", textAlign: "center"}}>{props.title}</h2>
        <div className="form-group" style={{marginBottom: "10px", marginTop: "30px"}}>

          <input
            type="text"
            name="name"
            value={address.name}
            onChange={(event) =>
              setAddress({ ...address, name: event.target.value })
            }

            placeholder="Họ tên người nhận"
            style={inputs}
          />
        </div>
        <div className="form-group" style={{marginBottom: "10px"}}>

          <input
            type="text"
            name="mobile"
            value={address.mobile}
            onChange={(event) =>
              setAddress({ ...address, mobile: event.target.value })
            }
            placeholder="Số điện thoại"

            style={inputs}
          />
        </div>
        <div className="form-group" style={{marginBottom: "10px"}}>
          <select 
            name="province" 
            onChange={handleGetApiAddress}
            style={inputs} 
          >

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

        <div className="form-group" style={{marginBottom: "10px"}}>
          <select
            style={inputs}

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
        <div className="form-group" style={{marginBottom: "10px"}}>
          <select
            name="ward"
            disabled={address.ward.status}
            onChange={handleGetApiAddress}
            style={inputs}
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
        <div className="form-group" style={{marginBottom: "20px"}}>
          <input
            type="text"
            name="desc"
            value={props.address.desc}
            onChange={(event) =>
              setAddress({ ...address, desc: event.target.value })
            }
            multiple
            placeholder="Địa chỉ cụ thể"
            style={inputs}
          />
        </div>
  
          {/* <FormControlLabel
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
          ></FormControlLabel> */}
 
 
        {jwt && (
          <div className="form-group d-flex justify-content-end" style={{gap: "10px"}}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => props.handleClose()}
              style={{paddingTop: "10px", fontSize: "14px"}}
            >
              Hủy
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="error"
              style={{paddingTop: "10px", fontSize: "14px"}}
            >
              Xác nhận
            </Button>
          </div>
        )}
      </form>
    </Box>
  );
};

export default FormAddress;
