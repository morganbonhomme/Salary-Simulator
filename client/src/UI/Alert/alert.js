import React from 'react';

const alert = (props) => {
return (
  <div className={`alert ${props.className} mt-4`} role='alert'>
    {props.message}
    {props.link}
  </div>
)

}

export default alert;