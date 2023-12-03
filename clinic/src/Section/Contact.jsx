import React from 'react'
import {GradientHeader, ToolTip} from 'Components'
import {HiMail} from 'react-icons/hi'
import { BiLogoFacebookCircle, BiSolidPhone } from 'react-icons/bi'

const Contact = () => {
  return (
    <section className='p-5 gap-5 d-flex justify-content-center align-items-center flex-column' style={{backgroundColor: 'var(--faded-color)'}}>
      <GradientHeader title={'Contact Us'} />
      <div className='gap-5 d-flex pb-5'>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <HiMail size={72} data-tooltip-id='tip0' />
            <strong>Gmail</strong>
            <ToolTip title={'atrpharmacy@gmail.com'} id={'tip0'} place={'top'} />
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <BiLogoFacebookCircle size={72} data-tooltip-id='tip1'/>
            <strong>Facebook</strong>
            <ToolTip title={'ATR Skin Care & Pharmacy Inc.'} id={'tip1'} place={'top'} />
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <BiSolidPhone size={72} data-tooltip-id='tip2'/>
            <strong>Phone</strong>
            <ToolTip title={'0917 838 1984'} id={'tip2'} place={'top'} />
        </div>
      </div>
    </section>
  )
}

export default Contact