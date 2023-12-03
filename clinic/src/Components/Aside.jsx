import React, { useState } from 'react'
import { Footer } from 'Components'
import logo from 'assets/logo/ATR Skin Care Logo.png'
import { Link } from 'react-router-dom'
import { handleActiveItem, iconPath } from 'Utils/handlingFunctions'
import { IconPark } from 'assets/SvgIcons'

const Aside = ({ props }) => {
    const [item, setItem] = useState('dashboard');

    return (
        <aside className={`${props} position-fixed top-0 left-0 bottom-0 py-2 px-1 gap-5 d-flex align-items-center flex-column admin-side`}>
            <div className='d-flex flex-column justify-content-center align-items-center text-light'>
                <img src={logo} width={'50px'} alt='logo' />
                ATR Skin Care
            </div>
            <ul className='list-unstyled d-flex flex-column gap-3'>
                <li className={`list-itm ${item === 'dashboard' ? 'list-active' : ''} px-2 py-2 rounded-2`} onClick={() => handleActiveItem('dashboard', setItem)}>
                    <Link to='/admin/dashboard'  className='gap-2 text-decoration-none d-flex align-items-center fw-medium'>
                        <IconPark path={iconPath(item, 'dashboard', 'ph:stack-fill', 'ph:stack')} size={30} />
                        Dashboard
                    </Link>
                </li>
                <li className={`list-itm ${item === 'product' ? 'list-active' : ''} px-2 py-2 rounded-2`} onClick={() => handleActiveItem('product', setItem)}>
                    <Link to='/admin/products' className='gap-2 text-decoration-none d-flex align-items-center fw-medium'>
                        <IconPark path={iconPath(item, 'product', 'ic:round-dashboard', 'radix-icons:dashboard')} size={30} />
                        Products
                    </Link>
                </li>
                <li className={`list-itm ${item === 'customer' ? 'list-active' : ''} px-2 py-2 rounded-2`} onClick={() => handleActiveItem('customer', setItem)}>
                    <Link to='/admin/customer-management' className='gap-2 text-decoration-none d-flex align-items-center fw-medium'>
                        <IconPark path={iconPath(item, 'customer', 'ph:users-fill', 'ph:users-bold')} size={30} />
                        Customers
                    </Link>
                </li>
                <li className={`list-itm ${item === 'order' ? 'list-active' : ''} px-2 py-2 rounded-2`} onClick={() => handleActiveItem('order', setItem)}>
                    <Link to='/admin/order-management' className='gap-2 text-decoration-none d-flex align-items-center fw-medium'>
                        <IconPark path={iconPath(item, 'order', 'mdi:cart', 'mdi:cart-outline')} size={30} />
                        Orders
                    </Link>
                </li>
                <li className={`list-itm ${item === 'pre-order' ? 'list-active' : ''} px-2 py-2 rounded-2`} onClick={() => handleActiveItem('pre-order', setItem)}>
                    <Link to='/admin/pre-order' className='gap-2 text-decoration-none d-flex align-items-center fw-medium'>
                        <IconPark path={iconPath(item, 'pre-order', 'solar:cart-bold', 'solar:cart-linear')} size={30} />
                        Pre-Order
                    </Link>
                </li>
                <li className={`list-itm ${item === 'history' ? 'list-active' : ''} px-2 py-2 rounded-2`} onClick={() => handleActiveItem('history', setItem)}>
                    <Link to='/admin/history' className='gap-2 text-decoration-none d-flex align-items-center fw-medium'>
                        <IconPark path={iconPath(item, 'history', 'uim:history', 'lucide:history')} size={30} />
                        Order history
                    </Link>
                </li>
                <li className={`list-itm ${item === 'content' ? 'list-active' : ''} px-2 py-2 rounded-2`} onClick={() => handleActiveItem('content', setItem)}>
                    <Link to='/admin/content-management' className='gap-2 text-decoration-none d-flex align-items-center fw-medium'>
                        <IconPark path={iconPath(item, 'content', 'iconamoon:delivery-fill', 'iconamoon:delivery')} size={30} />
                        Manage Website
                    </Link>
                </li>
                <li className={`list-itm ${item === 'profile' ? 'list-active' : ''} px-2 py-2 rounded-2`} onClick={() => handleActiveItem('profile', setItem)}>
                    <Link to='/admin/profile' className='gap-2 text-decoration-none d-flex align-items-center fw-medium'>
                        <IconPark path={iconPath(item, 'profile', 'mingcute:user-4-fill', 'mingcute:user-4-line')} size={30} />
                        Profile
                    </Link>
                </li>
                {/* <li className={`list-itm ${item === 'setting' ? 'list-active' : ''} px-2 py-2 rounded-2`} onClick={() => handleActiveItem('setting', setItem)}>
                    <Link to='profile' className='gap-2 text-decoration-none d-flex align-items-center fw-medium'>
                        <IconPark path={iconPath(item, 'setting', 'bi:gear-fill', 'octicon:gear-16')} size={30} />
                        Settings
                    </Link>
                </li>
                <li className='list-itm px-2 py-2 rounded-2' onClick={() => handleActiveItem('logout', setItem)}>
                    <Link to='meter-reading' className='gap-2 text-decoration-none d-flex align-items-center fw-medium'>
                        <IconPark path={iconPath(item, 'logout', 'simple-line-icons:logout', 'simple-line-icons:logout')} size={30} />
                        Logout
                    </Link>
                </li> */}
            </ul>

            <Footer props='position-absolute bottom-0 end-0'>
                <img src={logo} alt='ATR logo' width='30px'/>
                <strong className='store'> ATR Skin Care & Pharmacy Inc.</strong>
            </Footer>
        </aside>
    )
}

export default Aside