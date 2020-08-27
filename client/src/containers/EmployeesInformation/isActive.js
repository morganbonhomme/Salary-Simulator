import React from 'react';

const isActive = (props) => {
  let isActive;
  switch (props.isActive) {
    case true: 
      isActive = <span> Active </span>
    break;
    case false :
      isActive = <button type='button' className='btn btn-primary' onClick={props.onClick}>Resend invit</button>
      break;
    default: 
      isActive = <p> No information </p>
}
return (
  isActive
  )
};

export default isActive;