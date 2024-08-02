import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";


const Infomation = () => {
  const i = 0;
  const [showChangePass, setShowChangePass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(false)
  const [name, setName] = useState(false)
  const [phone, setPhone] = useState(false)
  
  return (
    <div className="infomation">
      <div className="container">
      <h2>Tài khoản của tôi</h2>
      <hr></hr>
      
      <Box sx={{padding: "1rem 3rem"}}>
       
        <address className="infomation__card">
         <Grid container>
       
            <Grid item xs={12} md={6}>
            <div> 
         <h4>Thông tin cá nhân</h4>
         <p>
            <strong>Họ và tên: </strong>
            <input type="text" style={{border: !name ? '1px solid transparent' : "1px solid silver"}} value={'Phạm Đức Nhân'}></input>
            <span onClick={() => setName(!name)}>Sửa</span>
          </p>
          <p>
            <strong>Email: </strong>
            <input type="text" style={{border: !email ? '1px solid transparent' : "1px solid silver"}} value={'pdn110402@gmail.com '}></input>
            <span onClick={() => setEmail(!email)}>Sửa</span>
          </p>
          <p>
            <strong>Số điện thoại:</strong>
            <input type="text" style={{border: !phone ? '1px solid transparent' : "1px solid silver"}} value={'0328310272'}></input>
   
            <span onClick={() => setPhone(!phone)}>Sửa</span>
          </p>
          <p>
            <strong>Giới tính: </strong>
            Nam
          </p>
          <p>
            <strong>Ngày sinh: </strong>
            <select>
              <option value="Ngày">Ngày</option>
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
            <select>
              <option value="Tháng">Tháng</option>

              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
            <select>
              <option value="Năm">Năm</option>
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </p>
          <div>
            <input
              type="checkbox"
              onClick={() => setShowChangePass(!showChangePass)}
            ></input>
            <label>Change Password</label>
           
          </div></div>
            </Grid>
    
          <Grid item xs={12} md={6}>
          {showChangePass && (
              <div className="password">
               
                <input type={showPassword ? "text" : "password"}  placeholder="Mật khẩu hiện tại *"></input>

                <input type={showPassword ? "text" : "password"} placeholder="Mật khẩu mới"></input>
                <input type={showPassword ? "text" : "password"} placeholder="Xác nhận mật khẩu mới"></input>
                <div><input type="checkbox" onClick={() => setShowPassword(!showPassword)}></input>
                <label >Hiển thị mật khẩu</label></div>
              </div>
            )}
          </Grid>
         </Grid>
       
        </address>
       <div className="save">
        <Button  type="submit" variant="contained">
            Lưu
          </Button></div>
      </Box>
      </div>
      

    </div>
  );
};

export default Infomation;
