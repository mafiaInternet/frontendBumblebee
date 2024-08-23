// FormAddress.jsx
import { Box, Button, Checkbox, FormControlLabel, TextField, MenuItem, Select, InputLabel } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress, updateAddressByUser } from "../state/address/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  height: 650,
  bgcolor: "background.paper",
  border: "1px solid silver",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px"
};

const FormAddress = (props) => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState({
    name: props.address.name || "",
    mobile: props.address.mobile || "",
    province: "",
    district: "",
    ward: "",
    desc: props.address.desc || "",
    state: props.address.state === "Mặc định" || false,
    provinces: [],
    districts: [],
    wards: []
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const { data } = await axios.get("https://vapi.vnappmob.com/api/province/");
        setAddress((prev) => ({ ...prev, provinces: data.results }));
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProvinces();
  }, []);

  const handleAddress = (event) => {
    event.preventDefault();
    const request = {
      name: address.name,
      mobile: address.mobile,
      province: address.province,
      district: address.district,
      ward: address.ward,
      description: address.desc,
      state: address.state ? "Mặc định" : "",
    };
    console.log(request)
    // if (props.type === "create") {
    //   dispatch(addAddress(request));
    // } else if (props.type === "update") {
    //   dispatch(updateAddressByUser({
    //     addressId: props.address.id,
    //     responseData: request,
    //   }));
    // }
  };

  const handleGetApiAddress = async (event) => {
    const { name, value } = event.target;
    if (name === "province") {
      try {
        const { data } = await axios.get(`https://vapi.vnappmob.com/api/province/district/${value}`);
        setAddress((prev) => ({ ...prev, districts: data.results, wards: [], district: "", ward: "" }));
      } catch (error) {
        console.error(error.message);
      }
    } else if (name === "district") {
      try {
        const { data } = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${value}`);
        setAddress((prev) => ({ ...prev, wards: data.results, ward: "" }));
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <Box sx={style}>
      <form method="POST" onSubmit={handleAddress}>
        <h2 style={{ fontSize: "24px", fontWeight: "500", textAlign: "center" }}>{props.title}</h2>
        <TextField
          fullWidth
          margin="normal"
          name="name"
          value={address.name}
          onChange={(e) => setAddress({ ...address, name: e.target.value })}
          label="Họ tên người nhận"
          InputProps={{
            style: { fontSize: '16px' } 
          }}
          InputLabelProps={{
            style: { fontSize: '14px' }
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          name="mobile"
          value={address.mobile}
          onChange={(e) => setAddress({ ...address, mobile: e.target.value })}
          label="Số điện thoại"
          InputProps={{
            style: { fontSize: '16px' } 
          }}
          InputLabelProps={{
            style: { fontSize: '14px' }
          }}
        />
        <InputLabel id="province-label" style={{fontSize: "14px"}}>Tỉnh/ Thành phố</InputLabel>
        <Select
          fullWidth
          labelId="province-label"
          name="province"
          value={address.province}
          onChange={(e) => {
            setAddress({ ...address, province: e.target.value });
            handleGetApiAddress(e);
          }}
          label="Tỉnh/ Thành phố"
        >
          {address.provinces.map((province) => (
            <MenuItem key={province.province_id} value={province.province_name}>
              {province.province_name}
            </MenuItem>
          ))}
        </Select>

        <InputLabel id="district-label" style={{fontSize: "14px"}}>Quận/ Huyện</InputLabel>
        <Select
          fullWidth
          labelId="district-label"
          name="district"
          value={address.district}
          onChange={(e) => {
            setAddress({ ...address, district: e.target.value });
            handleGetApiAddress(e);
          }}
          label="Quận/ Huyện"
          disabled={!address.province}
        >
          {address.districts.map((district) => (
            <MenuItem key={district.district_id} value={district.district_name}>
              {district.district_name}
            </MenuItem>
          ))}
        </Select>

        <InputLabel id="ward-label" style={{fontSize: "14px"}}>Phường/ Xã</InputLabel>
        <Select
          fullWidth
          labelId="ward-label"
          name="ward"
          value={address.ward}
          onChange={(e) => setAddress({ ...address, ward: e.target.value })}
          label="Phường/ Xã"
          disabled={!address.district}
        >
          {address.wards.map((ward) => (
            <MenuItem key={ward.ward_id} value={ward.ward_name}>
              {ward.ward_name}
            </MenuItem>
          ))}
        </Select>

        <TextField
          fullWidth
          margin="normal"
          name="desc"
          value={address.desc}
          onChange={(e) => setAddress({ ...address, desc: e.target.value })}
          multiline
          rows={4}
          label="Địa chỉ cụ thể"
          InputProps={{
            style: { fontSize: '16px' } 
          }}
          InputLabelProps={{
            style: { fontSize: '14px' }
          }}
        />

        {/* <FormControlLabel
          control={
            <Checkbox
              checked={address.state}
              onChange={() => setAddress({ ...address, state: !address.state })}
            />
          }
          label="Đặt làm mặc định"
        /> */}

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px", gap: "10px" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => props.handleClose()}
            style={{fontSize: "12px", padding: "7px 15px"}}
          >
            Hủy
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="error"
            style={{fontSize: "12px", padding: "7px 15px"}}
          >
            Xác nhận
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default FormAddress;
