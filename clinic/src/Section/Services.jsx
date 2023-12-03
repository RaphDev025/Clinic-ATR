import React from 'react'
import { GradientHeader } from 'Components'
import { imges, services } from 'Utils/initialData'

const Services = () => {
  return (
    <section className='p-5 gap-5 container'>
      <GradientHeader title={'Our Menu of Services'} />
      <div className='gri gap-4 p-0 container'>
      { services.map((data, indx) => (
        <div key={indx} className='image-container d-flex align-items-center justify-content-center' style={{ backgroundImage: `url(${imges[indx]})` }}>
          <div className='overlay'>
            <div className='overlay-content'>
              <h4 className='text-decoration-underline text-uppercase text-center text-light text-wrap w-75 fw-bold title_animate'>{data}</h4>
            </div>
          </div>
        </div>
      ))}
      </div>
    </section>
  )
}

export default Services