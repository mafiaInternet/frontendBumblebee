import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';

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
  const [showChangePass, setShowChangePass] = useState(true);
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
        <h2 style={{fontSize: "24px", fontWeight: "500"}}>Tài khoản của tôi</h2>
        <hr></hr>

        {auth && auth.user && (
          <Box sx={{ padding: "1rem 3rem" }}>
            <form className="infomation--card" onSubmit={handleUpdateUser}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <div className="form--group">
                    <div style={{marginBottom: "10px"}}>
                      <label style={{textAlign: "start"}}>Họ và tên: </label>
                      <input
                        type="text"
                        style={{
                          border: !name
                            ? "1px solid transparent"
                            : "1px solid silver",
                          borderRadius: "10px"
                        }}
                        value={user.name}
                      ></input>
                      <EditIcon onClick={() => setName(!name)} style={{fontSize: "20px", marginLeft: "10px"}}/>
                    </div>
                    <div style={{marginBottom: "10px"}}>
                      <label style={{textAlign: "start"}}>Email: </label>
                      <input
                        type="text"
                        style={{
                          border: !email
                            ? "1px solid transparent"
                            : "1px solid silver",
                          borderRadius: "10px"
                        }}
                        value={user.email}
                      ></input>
                      <EditIcon onClick={() => setEmail(!email)} style={{fontSize: "20px", marginLeft: "10px"}}/>
                    </div>
                    <div style={{marginBottom: "10px"}}>
                      <label style={{textAlign: "start"}}>Số điện thoại:</label>
                      <input
                        type="text"
                        style={{
                          border: !phone
                            ? "1px solid transparent"
                            : "1px solid silver",
                          borderRadius: "10px"
                        }}
                        value={user.mobile}
                      ></input>
                      <EditIcon onClick={() => setPhone(!phone)} style={{fontSize: "20px", marginLeft: "10px"}}/>
                    </div>
                    <div style={{marginBottom: "10px"}}>
                      <label style={{textAlign: "start"}}>Ngày sinh:</label>
                      <input
                        type="date"
                        style={{
                          border: !phone
                            ? "1px solid transparent"
                            : "1px solid silver",
                          borderRadius: "10px"
                        }}
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  {showChangePass && (
                    <div className="password">
                      <input style={{borderRadius: "10px", border: "1px solid silver", marginBottom: "17px", padding: "8px"}}
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu hiện tại *"
                      ></input>

                      <input style={{borderRadius: "10px", border: "1px solid silver", marginBottom: "17px", padding: "8px"}}
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu mới"
                      ></input>
                      <input style={{borderRadius: "10px", border: "1px solid silver", marginBottom: "17px", padding: "8px"}}
                        type={showPassword ? "text" : "password"}
                        placeholder="Xác nhận mật khẩu mới"
                      ></input>
                      <div className="d-flex" style={{justifyContent: "end"}}>
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
                <Button type="submit" color="error" variant="contained" style={{paddingTop: "10px"}}>
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
