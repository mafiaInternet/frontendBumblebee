import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Infomation = () => {
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [user, setUser] = useState({
    name: null,
    email: null,
    mobile: null,
    sex: null,
    birthday: null,
    password: null,
  });
  const [showChangePass, setShowChangePass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(false);
  const [name, setName] = useState(false);
  const [phone, setPhone] = useState(false);
  const [state, setState] = useState(new Date().toISOString());
  const handleUpdateUser = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (auth && auth.user && jwt) {
      setUser({
        ...user,
        name: auth.user.name,
        email: auth.user.email,
        mobile: auth.user.mobile,
      });
    }
  }, [auth.user,auth.jwt, jwt]);
  return (
    <div className="infomation">
      <div className="container">
        <h2>Tài khoản của tôi</h2>
        <hr></hr>

        {auth && auth.user && (
          <Box sx={{ padding: "1rem 3rem" }}>
            <h4>Thông tin cá nhân</h4>
            <form className="infomation--card" onSubmit={handleUpdateUser}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <div className="form--group">
                    <div>
                      <label>Họ và tên: </label>
                      <input
                        type="text"
                        style={{
                          border: !name
                            ? "1px solid transparent"
                            : "1px solid silver",
                        }}
                        value={user.name}
                      ></input>
                      <span onClick={() => setName(!name)}>Sửa</span>
                    </div>
                    <div className="form--group">
                      <label>Email: </label>
                      <input
                        type="text"
                        style={{
                          border: !email
                            ? "1px solid transparent"
                            : "1px solid silver",
                        }}
                        value={user.email}
                      ></input>
                      <span onClick={() => setEmail(!email)}>Sửa</span>
                    </div>
                    <div className="form--group">
                      <label>Số điện thoại:</label>
                      <input
                        type="text"
                        style={{
                          border: !phone
                            ? "1px solid transparent"
                            : "1px solid silver",
                        }}
                        value={user.mobile}
                      ></input>

                      <span onClick={() => setPhone(!phone)}>Sửa</span>
                    </div>

                    <div className="form--group">
                      <label>Ngày sinh:</label>
                      <input
                        type="date"
                        style={{
                          border: !phone
                            ? "1px solid transparent"
                            : "1px solid silver",
                        }}
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      ></input>
                    </div>

                    <div className="form--group">
                      <input
                        type="checkbox"
                        onClick={() => setShowChangePass(!showChangePass)}
                      ></input>

                      <Typography
                        component={"span"}
                        sx={{ marginLeft: "1rem", fontSize: "1.4rem" }}
                      >
                        Hiển thị mật khẩu
                      </Typography>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  {showChangePass && (
                    <div className="password">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu hiện tại *"
                      ></input>

                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu mới"
                      ></input>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Xác nhận mật khẩu mới"
                      ></input>
                      <div>
                        <input
                          type="checkbox"
                          onClick={() => setShowPassword(!showPassword)}
                        ></input>
                        <Typography
                          component={"span"}
                          sx={{ marginLeft: "1rem", fontSize: "1.4rem" }}
                        >
                          Hiển thị mật khẩu
                        </Typography>
                      </div>
                    </div>
                  )}
                </Grid>
              </Grid>
              <div className="save">
                <Button type="submit" color="error" variant="contained">
                  Lưu
                </Button>
              </div>
            </form>
          </Box>
        )}
      </div>
    </div>
  );
};

export default Infomation;
