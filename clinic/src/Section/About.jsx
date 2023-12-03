import React from 'react'
import {GradientHeader} from 'Components'
import logo from 'assets/extra/DOOR.png'


const About = () => {
  return (
    <section className='p-5 d-flex justify-content-center align-items-center flex-column'>
      <GradientHeader title={'About Us'} />
      <div className='container px-5 py-2 d-flex justify-content-center align-items-center'>
        <div className='text-center'>
          <img src={logo} alt='logo' width='60%' />
        </div> 
        <p className='col-7'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
        </p>
      </div>
    </section>
  )
}

export default About