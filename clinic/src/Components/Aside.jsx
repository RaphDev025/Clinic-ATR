import React, { useState, useEffect } from 'react'
import { Footer } from 'Components'
import logo from 'assets/logo/ATR Skin Care Logo.png'
import { Link } from 'react-router-dom'
import { handleActiveItem, iconPath } from 'Utils/handlingFunctions'
import { IconPark } from 'assets/SvgIcons'
import { useAuth } from 'Context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Aside = ({ props }) => {
    const [item, setItem] = useState('dashboard')
    const [notifications, setNotifications] = useState([])
    const { user } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/admin/dashboard')
        }
    }, [user])

    useEffect(() => {
        // Function to fetch notifications data
        const fetchNotifications = async () => {
            try {
                const response = await fetch('https://clinic-atr-server-inky.vercel.app/api/notification');
        
                if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
                }
        
                const data = await response.json();
                // Filter notifications for the admin user
                const adminNotifications = data.filter(notification => notification.to === 'admin');
                setNotifications(adminNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        // Call the fetchNotifications function when the component mounts
        fetchNotifications();
    }, [])

    const handleNotificationClick = async (notificationId) => {
        try {
          // Send API request to mark the isRead field as true
            const response = await fetch(`https://clinic-atr-server-inky.vercel.app/api/notification/${notificationId}`, {
                method: 'PATCH', // Assuming your API uses PUT for updating data
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isRead: true }),
            });
        
            if (!response.ok) {
                throw new Error(`Failed to mark notification as read: ${response.status}`);
            }
        
            // Update the local state to reflect the change
            setNotifications(prevNotifications =>
                prevNotifications.map(notification =>
                notification._id === notificationId ? { ...notification, isRead: true } : notification
                )
            );
            } catch (error) {
                console.error('Error marking notification as read:', error);
            }
    };
    
    return (
        <>
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
            </ul>

            <Footer props='position-absolute bottom-0 end-0'>
                <img src={logo} alt='ATR logo' width='30px'/>
                <strong className='store'> ATR Skin Care & Pharmacy Inc.</strong>
            </Footer>
        </aside>
        <header id='header' className='position-fixed top-0 end-0 p-2 d-flex justify-content-end align-items-center'>
            <div className='d-flex justify-content-end align-items-center pe-5 gap-3'>
                <div className="dropdown dropstart">
                    <Link className=' px-1 nav-button' data-bs-toggle="dropdown" data-bs-auto-close="true"  aria-expanded="false">
                        <IconPark path={iconPath(item, 'notif', 'mingcute:notification-fill', 'mingcute:notification-fill')} size={20} />
                    </Link>
                    <ul className="dropdown-menu">
                    {notifications && notifications.length > 0 ? (
                        notifications.map((notify) => (
                            <li key={notify._id} className="dropdown-item" onClick={() => handleNotificationClick(notify._id)}>
                            <div className='d-flex flex-column gap-2'>
                                <p className='m-0 w-100 d-flex flex-wrap'>{notify.content}</p>
                                <p className='m-0 fst-italic' style={{fontSize: '12px'}}>{notify.from}</p>
                            </div>
                            </li>
                        ))
                    ) : (
                        <li className="dropdown-item">No notifications yet</li>
                    )}
                    </ul>
                </div>
            </div>
        </header>
        </>
    )
}

export default Aside