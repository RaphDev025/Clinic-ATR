import React from 'react'
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi'
import avatar from 'assets/extra/Vector.png'

const SliderCard = ({data, id}) => { 
    return (
        <div id={id} className='rounded-4 testimony-card mx-3 gap-3 transparent-bg border border-dark border-2 d-flex flex-column'>
            <div className='d-flex align-items-center justify-content-between'>
                <img src={avatar} alt='avatar' />
                <strong className='text-dark'>{data.first_name} {data.last_name}</strong>
            </div>
            <div className='justify-content-center d-flex flex-column'>
                <div>
                    <BiSolidQuoteLeft size={32}/> 
                    <p className='text-content'><span className='pe-4 text-dark'>{data.feedback}</span> <BiSolidQuoteRight size={32}/></p>
                </div>
            </div>
        </div>
    )
}

export default SliderCard