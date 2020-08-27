import React from 'react';
import * as transformData from '../../../helpers/transformData';

const results = (props) => {  
  const results = transformData.salaryCalculation(props.data, props.currentValues, props.rangeFactor);
  const formattedResult = (new Intl.NumberFormat('fr', { style: 'currency', minimumFractionDigits : 0, currency: 'EUR'}).format(results.toFixed()));
  
  return (
    <div className='container-fluid bg-success'>
      <div className='row justify-content-center '>
        <div className='col mt-4 text-center'> 
          <p className='text-white font-weight-bold'><span className='h2'>{formattedResult}</span> / year (before tax)</p>
        </div>
      </div>
    </div>
  )
};

export default results;