import * as React from "react";

import TextField from "@mui/material/TextField";
import { Button, Grid, InputAdornment, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Register, User } from "../../state/auth/Action";
import PersonIcon from "@mui/icons-material/Person";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Email } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";

export default function AuthRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();

  React.useEffect(() => {
    if (jwt) {
      dispatch(User(jwt));
    }
  }, [dispatch, jwt, auth.jwt]);

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      name: data.get("name"),
      birthday: data.get("birthday"),
      phone: data.get("mobile"),
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(Register(userData))
  };
  return (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmitRegister}>
        <Typography
          class="title"
          style={{ fontSize: "35px", fontWeight: "500" }}
        >
          Đăng ký
        </Typography>
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <TextField
              required
              id="name"
              name="name"
              label="Họ và tên"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocalPhoneIcon fontSize="large" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Số điện thoại"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocalPhoneIcon fontSize="large" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Email fontSize="large" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Mật khẩu"
              type="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon fontSize="large" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Xác nhận mật khẩu"
              fullWidth
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon fontSize="large" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              disabled={confirmPassword !== password}
              fullWidth
              variant="contained"
              style={{ borderRadius: "10px", backGround: "#535353" }}
            >
              Đăng ký
            </Button>
          </Grid>
        </Grid>
      </form>
      <div>
        <div className="auth-link" style={{ marginTop: "25px" }}>
          <span>Bạn đã có tài khoản?</span>
          <span onClick={() => navigate("/login")}>Đăng nhập</span>
        </div>
      </div>
    </div>
  );
}
