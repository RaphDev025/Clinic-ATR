import React from 'react'
import { GradientHeader } from 'Components'
import logo from 'assets/extra/DOOR.png'
import { IconPark } from 'assets/SvgIcons'

const AboutPage = () => {

    return (
        <main className=' d-flex pt-2 p-0 m-0 vh-100'>
            <section className=' mt-5 overflow-y-auto' >
                <GradientHeader title={'About Us'} />
                <div className='d-flex align-items-center p-3'>
                    <div className='text-center'>
                        <img src={logo} alt='logo' width='60%' />
                    </div>
                    <div className='col-7'>
                        <h2 className='text-success'><strong>History</strong></h2>
                        <p>The Company was established since 2016 but, its operations  temporarily closed due to the COVID 19 pandemic. It was founded first by Dr, Angelita T. Reyes, however, in 2016, Rebecca Hidalgo continue to manage the ATR Skin care & Pharmacy Inc.</p>
                    </div>
                </div>
                <div className='p-3 d-flex flex-column align-items-center'>
                    <h2 className='text-uppercase text-success'><strong>Mission</strong></h2>
                    <p className='col-7'>The mission of ATR Skin Care and Pharmacy Inc. is to enhance the overall well-being and confidence of our customers by providing high-quality skincare products and pharmaceutical services. We are dedicated to delivering innovative solutions that promote healthy skin, improve beauty, and contribute to a fulfilling and vibrant life.</p>
                </div>
                <div className='p-3 d-flex flex-column align-items-center'>
                    <h2 className='text-uppercase text-success'><strong>Vision</strong></h2>
                    <p className='col-7'>Our vision at ATR Skin Care and Pharmacy Inc. is to touch hearts and make a meaningful difference in the lives of our customers. We envision a world where self-care is embraced as an essential aspect of overall health, where every individual feels comfortable and confident in their own skin. We aspire to be more than just a skincare and pharmacy company; we aim to be a trusted companion on the path to self-discovery and self-expression. By fostering authentic connections, promoting self-love, and delivering exceptional skincare products and services, we strive to inspire individuals to embrace their natural beauty, unlock their full potential, and live a life of authenticity and joy.</p>
                </div>

                <div className='gap-4 d-flex flex-column align-items-center p-4 px-5' style={{backgroundColor: 'var(--faded-color)'}}>
                    <div className='d-flex flex-column w-100 px-5'>
                        <h5 className='fw-bold text-uppercase'><IconPark path={'mdi:location'} color={'#008C1F'} size={36} /> Location</h5>
                        <p className='px-5 w-75 m-0 text-wrap d-flex gap-4'>
                            <span>Address:</span>
                            <span className='w-75 text-wrap'>147, 10th Floor Medical Plaza Building, Amorsolo Street, Makati, 1200 Metro Manila</span>
                        </p>
                    </div>
                    <div className='d-flex flex-column w-100 px-5'>
                        <h5 className='fw-bold text-uppercase'><IconPark path={'bi:clock-fill'} color={'#008C1F'} size={26} /> Business Hours</h5>
                        <p className='px-5 text-wrap'>Monday to Friday .............9am to 5pm</p>
                        <p className='px-5 text-wrap'>Saturday ............................9am to 12pm</p>
                        <p className='px-5 text-wrap'>Sunday................................Closed</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AboutPage