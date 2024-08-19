import { TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ListOrders = () => {
    const dispatch = useDispatch()
    const {carts} = useSelector(store=>store)
    return (
        <div className='listOrders'>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Thông tin sản phẩm</TableCell>
                            <TableCell align='left'>Price</TableCell>
                            <TableCell align='left'>Status</TableCell>
                            <TableCell align='left'>Customer</TableCell>
                            <TableCell align='left'>Address</TableCell>
                            <TableCell align='left'>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow></TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ListOrders;
