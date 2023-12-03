import React from 'react'
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi'

const SliderCard = ({data, id}) => { 
    return (
        <div id={id} className='rounded-4 p-5 mx-3 gap-3 transparent-bg border border-dark border-2 d-flex flex-column'>
            <div className='d-flex align-items-center justify-content-between'>
                {data.icon}
                <strong className='text-dark'>{data.name}</strong>
            </div>
            <div className='justify-content-center  d-flex flex-column'>
                <div>
                    <BiSolidQuoteLeft size={32}/> 
                    <p className='fs-5'><span className='pe-4 text-dark'>{data.review}</span> <BiSolidQuoteRight size={32}/></p>
                </div>
            </div>
        </div>
    )
}

export default SliderCard