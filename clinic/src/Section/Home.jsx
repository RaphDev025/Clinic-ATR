import React from 'react'
import { BsFillHandbagFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className='home home-section'>
      <div className='text-uppercase inner-home'>
        <h1 className='text-success display-4 mb-5' >Discover your Skin's True Potential</h1>
        <h4 className='mb-5 highlight'><strong>Elevate Your Skin Care With Us!</strong></h4>
        <button onClick={() => navigate('/featured')} className='orderBtn px-3 py-2 text-uppercase text-light'><BsFillHandbagFill /> <span className='fs-6'>Order Now</span></button>
      </div>
    </section>
  )
}

export default Home