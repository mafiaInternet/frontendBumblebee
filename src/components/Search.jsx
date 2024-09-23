import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findProductFilter,  } from '../state/product/Action';
import { useLocation } from 'react-router-dom';

import { Grid } from 'antd';
import ProductCard from './Product/components/ProductCard';
import { Box, Typography } from '@mui/material';

const Search = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('query'); 
    const {products} = useSelector(store => store)
    useEffect(() => {
        dispatch(findProductFilter({category: "", name: name}))
    }, [dispatch])
    return (
        <div className='search'>
             <Grid container spacing={2}>
          {products.products ? (
            products.products.length > 0 ? (
              products.products.map((product, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <div>abc</div>
            )
          ) : (
            <Grid item xs={12}>
              <Box >
                <Typography style={{ fontSize: "24px" }}>Loading...</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
        </div>
    );
}

export default Search;
