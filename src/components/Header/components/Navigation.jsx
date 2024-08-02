import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from "react-redux";
import { Logout, User } from '../../../state/auth/Action';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import zIndex from '@mui/material/styles/zIndex';
import { Box, Typography } from '@mui/material';
export default function Navigation() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()
  const jwt=localStorage.getItem('jwt')
  const {auth} = useSelector(store=>store)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if(jwt){
      dispatch(User(jwt))
    }
  }, [jwt, auth.jwt])

  const handleLogout = ()  =>{

    dispatch(Logout())
   
  }


  return (
    <Box sx={{cursor: "pointer", color: 'black'}}>
      <PersonOutlineOutlinedIcon
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{color: 'black',fontSize: '3.5rem'} }
      >
  
      </PersonOutlineOutlinedIcon>


      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
       
        <MenuItem onClick={handleClose}>
          <Link to='/account'>Tài khoản</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={'/address'}>Địa chỉ của tôi</Link>
        </MenuItem>
        <MenuItem>
          <Link to={'/order'}>Đơn hàng của tôi</Link>
        </MenuItem>
        <MenuItem>
          <Link to={'/voucher'}>Voucher</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </Menu>

    </Box>
  );
}