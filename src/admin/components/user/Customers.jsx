import React from 'react';
import ListCustomers from './components/ListCustomer';
import ChangeCustomer from './components/ChangeCustomer';
import { useLocation, useParams } from 'react-router-dom';

const Customers = () => {

  return (
    <div className='customer-main'>
    <ListCustomers></ListCustomers>


    </div>
  );
}

export default Customers;
