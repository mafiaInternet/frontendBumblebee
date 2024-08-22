import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Infomation = () => {
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState({ name: false, email: false, phone: false });
  const [state, setState] = useState(auth?.user?.birthday || "");
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    passwordAgain: "",
    passwordAuthentic: "",
  });

  useEffect(() => {
    if (auth?.user && jwt) {
      console.log(auth.user)
      setUser({
        name: auth?.user?.name || "",
        email: auth?.user?.email || "",
        mobile: auth?.user?.mobile || ""
      });
    }
  }, [auth, jwt]);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    setIsEditing({ name: false, email: false, phone: false });
    if (user?.password !== user?.passwordAgain) {
      toast.error("Mật khẩu không khớp!");
      return;
    }
    const sendData = {
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      birthday: state || "",
      password: user?.password || "",
      passwordAuthentic: user?.passwordAuthentic || ""
    }
    console.log(sendData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="infomation">
      <div className="container">
        <h2 style={{ fontSize: "24px", fontWeight: "500" }}>TÀI KHOẢN CỦA TÔI</h2>
        <hr />
        {auth?.user && (
          <Box sx={{ padding: "1rem 3rem" }}>
            <form className="infomation--card" onSubmit={handleUpdateUser}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <div className="form--group">
                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ textAlign: "start" }}>Họ và tên:</label>
                      <input
                        type="text"
                        name="name"
                        style={{
                          border: !isEditing.name ? "1px solid transparent" : "1px solid silver",
                          borderRadius: "10px",
                        }}
                        value={user.name}
                        onChange={handleInputChange}
                        disabled={!isEditing.name}
                      />
                      <EditIcon onClick={() => setIsEditing((prev) => ({ ...prev, name: !prev.name }))}
                        style={{ fontSize: "20px", marginLeft: "10px" }} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ textAlign: "start" }}>Email:</label>
                      <input
                        type="text"
                        name="email"
                        style={{
                          border: !isEditing.email ? "1px solid transparent" : "1px solid silver",
                          borderRadius: "10px",
                        }}
                        value={user.email}
                        onChange={handleInputChange}
                        disabled={!isEditing.email}
                      />
                      <EditIcon onClick={() => setIsEditing((prev) => ({ ...prev, email: !prev.email }))}
                        style={{ fontSize: "20px", marginLeft: "10px" }} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ textAlign: "start" }}>Số điện thoại:</label>
                      <input
                        type="text"
                        name="mobile"
                        style={{
                          border: !isEditing.phone ? "1px solid transparent" : "1px solid silver",
                          borderRadius: "10px",
                        }}
                        value={user.mobile}
                        onChange={handleInputChange}
                        disabled={!isEditing.phone}
                      />
                      <EditIcon onClick={() => setIsEditing((prev) => ({ ...prev, phone: !prev.phone }))}
                        style={{ fontSize: "20px", marginLeft: "10px" }} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ textAlign: "start" }}>Ngày sinh:</label>
                      <input
                        type="date"
                        name="birthday"
                        style={{
                          border: "1px solid silver",
                          borderRadius: "10px",
                        }}
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="password">
                    <input
                      style={{ borderRadius: "10px", border: "1px solid silver", marginBottom: "17px", padding: "8px" }}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleInputChange}
                      placeholder="Mật khẩu hiện tại"
                    />

                    <input
                      style={{ borderRadius: "10px", border: "1px solid silver", marginBottom: "17px", padding: "8px" }}
                      type={showPassword ? "text" : "password"}
                      name="passwordAgain"
                      onChange={handleInputChange}
                      placeholder="Mật khẩu mới"
                    />
                    <input
                      style={{ borderRadius: "10px", border: "1px solid silver", marginBottom: "17px", padding: "8px" }}
                      type={showPassword ? "text" : "password"}
                      name="passwordAuthentic"
                      onChange={handleInputChange}
                      placeholder="Xác nhận mật khẩu mới"
                    />
                    <div className="d-flex" style={{ justifyContent: "end" }}>
                      <input
                        type="checkbox"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                      <Typography
                        component={"span"}
                        sx={{ marginLeft: "1rem", fontSize: "1.4rem" }}
                      >
                        Hiển thị mật khẩu
                      </Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <div className="save">
                <Button type="submit" color="error" variant="contained" style={{ paddingTop: "10px" }}>
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
