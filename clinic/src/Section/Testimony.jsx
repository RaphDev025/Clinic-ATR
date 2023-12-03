import React from 'react'
import {GradientHeader, Testimonials} from 'Components'
import avatar from 'assets/extra/Vector.png'

const Testimony = () => {
  const sampleData = [
    {
      id: 1,
      name: 'Sample Name 1',
      review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      icon: <img src={avatar} alt='avatar' width={'50px'} />
    },
    {
      id: 2,
      name: 'Sample Name 2',
      review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      icon: <img src={avatar} alt='avatar' width={'50px'} />
    },
    {
      id: 3,
      name: 'Sample Name 3',
      review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      icon: <img src={avatar} alt='avatar' width={'50px'} />
    },
    {
      id: 4,
      name: 'Sample Name 3',
      review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      icon: <img src={avatar} alt='avatar' width={'50px'} />
    }
  ]
  return (
    <section className='p-5 ' style={{backgroundColor: 'var(--faded-color)'}}>
      <GradientHeader title={'Testimonials'} />
      <div className='container mt-3'>
        <Testimonials contents={sampleData} />
      </div>
    </section>
  )
}

export default Testimony