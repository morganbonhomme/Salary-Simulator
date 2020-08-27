import React from 'react';

const userData = (props) => {  

  let salary;
  if (props.salary) {
    salary = <p className='font-weight-bolder my-1'>{(new Intl.NumberFormat('fr', { style: 'currency', minimumFractionDigits : 0, currency: 'EUR'}).format(props.salary.toFixed()))}</p>
  }
  
  const user = <p className='my-1'>{ `
    ${props.values.job} // 
    ${props.values.country} // 
    ${props.values.city} // 
    ${props.values.seniority} // 
    ${props.values.masterRange} // 
    ${props.values.masterValue} // 
    ${props.values.contract}
  ` }</p>

  return (
    <div className='container-fluid mb-3 bg-light border rounded '>
      <div className='row justify-content-center '>
        <div className='col my-2 text-center'> 
        <p className='my-1'> Your actual salary (before tax): </p>
        {salary}
        {user}
        </div>
      </div>
    </div>
  )
};

export default userData;