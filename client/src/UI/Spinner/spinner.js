import React from 'react';

const spinner = () => {
return (
  <div className='text-center text-secondary mt-5 mb-5 pt-5'>
  <div className='spinner-border' role='status'>
    <span className='sr-only'>Loading...</span>
  </div>
</div>
)

}

export default spinner;