import React from 'react';

const input = (props) => {

  let inputElement = null;
  switch (props.elementType) {
    case ('input'):
      inputElement = <input 
        className='form-control'
        {...props.elementConfig} 
        value={props.value}
        onChange={props.onChange}/>
      break;
    default:
      inputElement = <input 
        className='form-control'
        {...props.elementConfig} 
        value={props.value}
        onChange={props.onChange}/>
      break;
  }

  return (
    <div className='form-group'>
      <label>{props.label}</label>
      {inputElement}
      <div className='text-danger'>{props.errorMessage}</div>
    </div>
  )
}

export default input