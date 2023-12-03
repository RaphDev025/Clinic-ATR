import React from 'react'
import { Home, Update, Service, Featured, Testimony, About, Contact } from 'Section'
import { Footer } from 'Components'
import logo from 'assets/logo/ATR Skin Care Logo.png'
import { BsCCircle } from 'react-icons/bs'

const LandingPage = () => {
    return (
        <main className='mt-5 landingPage'>
            <Home />
            <Update />
            <Service />
            <Featured />
            <Testimony />
            <About />
            <Contact />
            <Footer>
                <BsCCircle className='text-warning fw-bold ic' />2023 <strong> ATR Skin Care & Pharmacy Inc.</strong>
                <img src={logo} alt='ATR logo' width='30px'/>
            </Footer>
        </main>
    )
}

export default LandingPage