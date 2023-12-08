import React, { useEffect, useState } from 'react'
import icon from 'assets/logo/ATR Skin Care Logo.png'
import { IconPark } from 'assets/SvgIcons'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'Context/AuthContext'

const Navbar = () => {
    const [select, setSelected] = useState('home')
    const [isNavbarCollapsed, setNavbarCollapsed] = useState(true)
    const { user } = useAuth()

    const handleItemClick = (state) => {
        setSelected(state)
        setNavbarCollapsed(true)
    }

    const handleNavbarToggle = () => {
        // Toggle the collapsed state of the navbar in mobile mode
        setNavbarCollapsed(!isNavbarCollapsed);
    }
    useEffect(() => {
        if (user) {
            navigate('/featured')
        }
    }, [user]);
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([])

    const fetchNotifications = async () => {
        try {
          const response = await fetch('https://clinic-atr-server-inky.vercel.app/api/notification');
    
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
    
          const username = user.first_name;
          const data = await response.json();
          const userNotifications = data.filter((notification) => notification.to === username);
    
          setNotifications(userNotifications);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
    
      useEffect(() => {
        // Fetch notifications initially
        fetchNotifications();
    
        // Set up a timer to fetch notifications every second
        const intervalId = setInterval(fetchNotifications, 1000);
    
        // Clean up the timer when the component unmounts
        return () => clearInterval(intervalId);
      }, [user]);

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
                        <div className="dropdown dropstart" >
                            <Link className=' px-1 nav-button' data-bs-toggle="dropdown" data-bs-auto-close="true"  aria-expanded="false">
                                <IconPark path={'mdi:bell'} size={24}/>
                            </Link>
                            <ul className="dropdown-menu overflow-y-auto" style={{height: '450px'}}>
                            {notifications && notifications.length > 0 ? (
                                notifications.map((notify) => (
                                    <li key={notify._id} className="dropdown-item" onClick={() => handleNotificationClick(notify._id)}>
                                    <div className='d-flex flex-column gap-2'>
                                        <p className='m-0 d-flex w-100 flex-wrap'>{notify.content}</p>
                                        <p className='m-0 fst-italic' style={{fontSize: '12px'}}>{notify.from}</p>
                                    </div>
                                    </li>
                                ))
                            ) : (
                                <li className="dropdown-item">No notifications yet</li>
                            )}
                            </ul>
                        </div>
                        <Link onClick={handleNavbarToggle} to='/user-profile' className=' px-1 nav-button'><IconPark path={'mingcute:user-4-fill'} size={24}/></Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar