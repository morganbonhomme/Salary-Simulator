import React from 'react';

const forbiddenAccess = () => {
  return (
    <div>
      <div className='alert alert-danger mt-4'>Forbidden access You need to be an admin to access this page.</div>
    </div>
  )
}

export default forbiddenAccess;