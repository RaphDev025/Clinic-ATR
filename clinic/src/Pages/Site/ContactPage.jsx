import React from 'react'
import {GradientHeader, ToolTip} from 'Components'
import doc from 'assets/extra/doc.jpg'
import {HiMail} from 'react-icons/hi'
import { BiLogoFacebookCircle, BiSolidPhone } from 'react-icons/bi'
import avatar from 'assets/extra/Vector.png'

const ContactPage = () => {
    return (
        <main className='contact-main'>
            <header>
                <GradientHeader title={'Contacts'} />
            </header>
            <section className='contact-section'>
                <div className='inner-section'>
                    <img src={doc || avatar} alt='avatar' className='rounded-5 contact-person' width='20%'/>
                    <h4 className='text-uppercase mt-3 fw-bolder'>Rebecca C. Hidalgo</h4>
                    <hr className='w-50 m-0 border border-success border-2 opacity-100' />
                    <h5>Contact Person</h5>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <h3 className='text-success fw-bolder'>Email Us</h3>
                    <span className='text-secondary'>on Gmail</span>
                    <HiMail size={72} data-tooltip-id='tip0' />
                        <ToolTip title={'atrpharmacy@gmail.com'} id={'tip0'} place={'top'} />
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <h3 className='text-success fw-bolder'>Call Us</h3>
                    <span className='text-secondary'>on Viber</span>
                    <BiSolidPhone size={72} data-tooltip-id='tip2'/>
                        <ToolTip title={'0917 838 1984'} id={'tip2'} place={'top'} />
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <h3 className='text-success fw-bolder'>Like our Page</h3>
                    <span className='text-secondary'>on Facebook</span>
                    <BiLogoFacebookCircle size={72} data-tooltip-id='tip1'/>
                        <ToolTip title={'ATR Skin Care & Pharmacy Inc.'} id={'tip1'} place={'top'} />
                </div>
            </section>
        </main>
    )
}

export default ContactPage