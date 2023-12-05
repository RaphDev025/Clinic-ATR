import React, { useState } from 'react'
import icon from 'assets/logo/ATR Skin Care Logo.png'
import { IconPark } from 'assets/SvgIcons'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [select, setSelected] = useState('home')
    const [isNavbarCollapsed, setNavbarCollapsed] = useState(true)

    const handleItemClick = (state) => {
        setSelected(state)
        setNavbarCollapsed(true)
    }

    const handleNavbarToggle = () => {
        // Toggle the collapsed state of the navbar in mobile mode
        setNavbarCollapsed(!isNavbarCollapsed);
    }

    const navigate = useNavigate();

    return (
        <nav className='navbar navbar-expand-lg px-5-md px-3-sm fixed-top' style={{color: 'green'}}>
            <div className='container-fluid'>
                <Link className='navbar-brand text-success' to='/'>
                    <img src={icon} alt='logo' width='30' height='30' className='d-inline-block align-text-center me-2' />
                    ATR Skin Care
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={handleNavbarToggle}><span className="navbar-toggler-icon"></span></button>
                <div id='navbarSupportedContent' className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`}>
                    <ul className='navbar-nav gap-2 text-center ms-auto'>
                        {/* nav items */}
                        <li className={`nav-item ${select === 'home' ? 'active' : ''}`} onClick={() => handleItemClick('home')}>
                            <Link className={`nav-link ${select === 'home' ? 'active' : 'text-success'}`} to='/'>Home</Link>
                        </li>
                        <li className={`nav-item ${select === 'feed' ? 'active' : ''}`} onClick={() => handleItemClick('feed')}>
                            <Link className={`nav-link ${select === 'feed' ? 'active' : 'text-success'}`} to='/newsfeed'>Updates</Link>
                        </li>
                        <li className={`nav-item ${select === 'service' ? 'active' : ''}`} onClick={() => handleItemClick('service')}>
                            <Link className={`nav-link ${select === 'service' ? 'active' : 'text-success'}`} to='/service'>Services</Link>
                        </li>
                        <li className={`nav-item ${select === 'feature' ? 'active' : ''}`} onClick={() => handleItemClick('feature')}>
                            <Link className={`nav-link ${select === 'feature' ? 'active' : 'text-success'}`} to='/featured'>Products</Link>
                        </li>
                        <li className={`nav-item ${select === 'testimony' ? 'active' : ''}`} onClick={() => handleItemClick('testimony')}>
                            <Link className={`nav-link ${select === 'testimony' ? 'active' : 'text-success'}`} to='/testimony'>Testimonials</Link>
                        </li>
                        <li className={`nav-item ${select === 'about' ? 'active' : ''}`} onClick={() => handleItemClick('about')}>
                            <Link className={`nav-link ${select === 'about' ? 'active' : 'text-success'}`} to='/about'>About Us</Link>
                        </li>
                        <li className={`nav-item ${select === 'contact' ? 'active' : ''}`} onClick={() => handleItemClick('contact')}>
                            <Link className={`nav-link ${select === 'contact' ? 'active' : 'text-success'}`} to='/contact'>Contact Us</Link>
                        </li>
                    </ul>
                    {/* Buttons */}
                    <form className='d-flex justify-content-center gap-3 p-2'>
                        <Link onClick={handleNavbarToggle} to='/cart' className=' px-1 nav-button'><IconPark path={'mdi:cart'}  size={24}/></Link>
                        <Link onClick={handleNavbarToggle} to='/' className=' px-1 nav-button'><IconPark path={'mdi:bell'} size={24}/></Link>
                        <Link onClick={handleNavbarToggle} to='/user-profile' className=' px-1 nav-button'><IconPark path={'mingcute:user-4-fill'} size={24}/></Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar