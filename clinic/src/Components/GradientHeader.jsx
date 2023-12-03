import React from 'react'

const GradientHeader = ({title}) => {
  return (
    <div className='d-flex w-100 justify-content-center'>
      <div className='bg px-3 rounded-3 mb-3'>
        <h3 className='text-uppercase text-center p-3 m-0 head'>{title}</h3>
      </div>
    </div>
  )
}

export default GradientHeader