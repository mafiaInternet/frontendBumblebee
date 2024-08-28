import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from '@mui/icons-material/Person';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Email } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';

export default function AddCustomer() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const jwt=localStorage.getItem('jwt')
  const {auth} = useSelector(store=>store)
  const [password, setPassword] = React.useState()
  const [confirmPassword, setConfirmPassword] = React.useState()
  const handleSubmitRegister = (event) =>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData={
      name: data.get('name'),
      birthday: data.get('birthday'),
      phone: data.get("phone"),
      email: data.get("email"),
      password: data.get("password")
    }
  }

  return (
    <div className="register">
      <h3 style={{fontSize: "30px", marginBottom: "20px", textAlign:"center"}}>Đăng ký</h3>
      <form className="register-form" onSubmit={handleSubmitRegister}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField required id="name" name="name" label="Tên" fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PersonIcon fontSize="large"/>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
         <Grid item xs={12}>
          <TextField id="birthday" name="birthday" label="Ngày sinh" fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PermContactCalendarIcon fontSize="large"/>
                </InputAdornment>
              ),
            }}
          />
         </Grid>
          <Grid item xs={12}>
            <TextField required id="phone" name="phone" label="Số điện thoại" fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocalPhoneIcon fontSize="large"/>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField required id="email" name="email" label="Email" fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Email fontSize="large"/>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField required id="password" name="password" label="Mật khẩu" fullWidth onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon fontSize="large"/>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField required id="confirmPassword" name="confirmPassword" label="Xác nhận mật khẩu" fullWidth onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon fontSize="large"/>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
     
            <Button type="submit" disabled={confirmPassword !== password} fullWidth variant="contained">
              Đăng ký
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="d-flex justify-contetnt-start">
        <div className="auth-link">
          <span>Đã có tài khoản?</span>
          <span onClick={() => navigate("/login")}>Đăng nhập</span>
        </div>
      </div>
    </div>
  );
}
