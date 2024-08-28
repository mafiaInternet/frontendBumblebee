import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid, Typography, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Login, User } from "../../state/auth/Action";
import { Email } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";

export default function AuthLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  React.useEffect(() => {
    if (jwt) {
      dispatch(User(jwt));
    }
  }, [dispatch, jwt, auth.jwt]);

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(Login(userData));
  };

  return (
    <div className="login">
      <form className="login-form" method="POST" onSubmit={handleSubmitLogin}>
        <Typography
          class="title"
          style={{ fontSize: "35px", fontWeight: "500" }}
        >
          Đăng nhập
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              label="Email"
              name="email"
              fullWidth
              autoComplete="email"
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
              type="password"
              required
              id="password"
              label="Password"
              name="password"
              fullWidth
              autoComplete="password"
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
              fullWidth
              variant="contained"
              style={{ borderRadius: "10px", backGround: "#535353" }}
            >
              Đăng nhập
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="auth-link" style={{ marginTop: "25px" }}>
        <div>
          <span>Bạn chưa có tài khoản?</span>
          <span onClick={() => navigate("/register")}>Đăng ký</span>
        </div>
      </div>
    </div>
  );
}
