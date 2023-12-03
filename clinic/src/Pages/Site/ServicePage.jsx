import React from 'react'
import { GradientHeader } from 'Components'
import { imges } from 'Utils/initialData'
const ServicePage = () => {
    return (
        <main className='container-fluid d-flex p-0 vh-100'>
            <section className='container-fluid overflow-y-scroll mt-5 py-3'>
                <GradientHeader title={'Menu of Services'} />
                <div className='d-flex flex-column justify-content-center align-items-center p-4 gap-3' >
                    <div className='service-card border rounded-3 border-success' style={{backgroundColor: 'var(--faded-color)'}}>
                        <h3 className='service-header fs-5'>
                            <img src={imges[0]} alt={imges[0]} width={'100%'} height={'100%'} />
                            <p className='service-title'>
                                <span className=''>Dermatologica Facial Services</span>
                                <span className='text-success fw-bold'>P 1,000.00</span>
                            </p>
                        </h3>
                        <ul className='service-list'>
                            <li>Deep Cleansing Facial (For Normal skin Tone)</li>
                            <li>Anti-Oxidant Facial (for Oily to Pimple Probe Skin)</li>
                            <li>Rejuvinating Facial (for Dry, Oily, to Normal Skin)</li>
                            <li>Whitening Derma for All Skin Types</li>
                        </ul>
                    </div>

                    <div className='service-card border rounded-3 border-success' style={{backgroundColor: 'var(--faded-color)'}}>
                        <h3 className='service-header fs-5'>
                            <img src={imges[5]} alt={imges[5]} width={'100%'} height={'100%'} />
                            <p className='service-title '>
                                <span className=''>Therapeutic Facial Treatment</span>
                                <span className=' text-success fw-bold'>P 1,000.00</span>
                            </p>
                        </h3>
                        <ul className='service-list'>
                            <li>Acne Treatment</li>
                            <li>Intralesional Acne Injection</li>
                            <li>Glycolic Acid Peel (AHIA) Theraphy</li>
                        </ul>
                    </div>

                    <div className='service-card border rounded-3 border-success' style={{backgroundColor: 'var(--faded-color)'}}>
                        <h3 className='service-header fs-5'>
                            <img src={imges[3]} alt={imges[3]} width={'100%'} height={'100%'} />
                            <p className='service-title '>
                                <span className=''>Removal / Extraction / Excision</span>
                                <span className=' text-success fw-bold'>P 1,000.00</span>
                            </p>
                        </h3>
                        <ul className='service-list'>
                            <li>Warts Removal (Electrocautery)</li>
                            <li>Milia Extraction + Electrocautery</li>
                            <li>Oil Cyst or Cholesterol Cyst</li>
                            <li>Keloid Intralesional Injection</li>
                        </ul>
                    </div>

                    <div className='service-card border rounded-3 border-success' style={{backgroundColor: 'var(--faded-color)'}}>
                        <h3 className='service-header fs-5'>
                            <img src={imges[4]} alt={imges[4]} width={'100%'} height={'100%'} />
                            <p className='service-title '>
                                <span className=''>Skin Rejuvination</span>
                                <span className=' text-success fw-bold'>P 1,000.00</span>
                            </p>
                        </h3>
                        <ul className='service-list '>
                            <li>Lontophoresis Therapy + Facial</li>
                            <li>(Combination of Vit. C and Hyaluronic Serum)</li>
                            <li>Diamond Power + Facial</li>
                        </ul>
                    </div>

                    <div className='service-card border rounded-3 border-success' style={{backgroundColor: 'var(--faded-color)'}}>
                        <h3 className='service-header fs-5'>
                            <img src={imges[2]} alt={imges[2]} width={'100%'} height={'100%'} />
                            <p className='service-title '>
                                <span className=''>RF + Cavitation LIPO</span>
                                <span className=' text-success fw-bold'>P 1,000.00</span>
                            </p>
                        </h3>
                        <ul className='service-list'>
                            <li>(Skin Tightening and Body contouring Treatment)</li>
                            <li>Face</li>
                            <li>Tummy</li>
                        </ul>
                    </div>

                    <div className='service-card  border rounded-3 border-success' style={{backgroundColor: 'var(--faded-color)'}}>
                        <h3 className='service-header fs-5'>
                            <img src={imges[1]} alt={imges[1]} width={'100%'} height={'100%'} />
                            <p className='service-title '>
                                <span className=''>Laser Treatment</span>
                                <span className=' text-success fw-bold'>P 1,000.00</span>
                            </p>
                        </h3>
                        <ul className='service-list' >
                            <li>IPL (for Facial, Skin Rejuvination, Wrinkle Removal, Figment Removal)</li>
                            <li>IPL (Upper Lip/ Underarm/ Bikini Area/ Legs)</li>
                            <li>Tummy</li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ServicePage