// src/components/Form.js

import React from 'react';
import PriceCalc from '../components/PriceCalc';
const API_URL = import.meta.env.VITE_APP_API_URL
const Pricing = () => {
  return (
    <div className='min-h-screen bg-brand-gray'>
      <PriceCalc/>
    </div>
  );
}

export default Pricing;
