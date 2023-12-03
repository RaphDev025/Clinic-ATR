import React from 'react'
import { Footer } from 'Components'
import logo from 'assets/logo/ATR Skin Care Logo.png'

const SideBar = ({children, props}) => {
    return (
        <aside className={`${props} position-relative`}>
            {children}
            <Footer props='position-absolute bottom-0 end-0'>
                <img src={logo} alt='ATR logo' width='30px'/>
                <strong className='store'> ATR Skin Care & Pharmacy Inc.</strong>
            </Footer>
        </aside>
    )
}

export default SideBar