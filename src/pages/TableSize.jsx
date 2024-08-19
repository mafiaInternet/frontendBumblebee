import { Box } from '@mui/material';
import React from 'react';

const TableSize = () => {
    return (
        <Box className='tableSize' sx={{width: {xs: "90%", md: "80%"}, margin: '40px auto'}}>
            <img className='img-fluid' src='https://bizweb.dktcdn.net/100/415/697/files/bang-size.png?v=1639245000729'></img>
        </Box>
    );
}

export default TableSize;
