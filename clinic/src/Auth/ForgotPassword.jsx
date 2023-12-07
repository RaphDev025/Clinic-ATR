import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconPark } from 'assets/SvgIcons'

const ForgotPassword = () => {
    const [userData, setUserData] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        userName: '',
        newPassword: '',
        confirmPassword: '',
    })
    
    const handleInputChange = (e) => {
        const { id, value } = e.target;
    
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    }
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://clinic-atr-server-inky.vercel.app/api/users`);
                const data = await response.json();
                setUserData(data);
                console.log(data)
            } catch (error) {
                console.log('Error fetching user data:', error);
            }
        };
        console.log(userData)
        fetchUserData();
    }, []);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
    
        try {
          // Find the user in the userData array
            userData.forEach(async (user) => {
                if (user.user_name === formData.userName) {
                    if (user) {
                        // Extract the _id of the found user
                        const userId = user._id;
            
                        // Make the PATCH request to update the password
                        const response = await fetch(`https://clinic-atr-server-inky.vercel.app/api/users/${userId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ password: formData.newPassword }), // assuming formData.newPassword is a string
                        });
            
                        // Check if the request was successful
                        if (response.ok) {
                            alert('Password updated successfully!');
                            navigate('/auth/user-login')
                        } else {
                            alert('Failed to update password. Status:', response.status);
                        }
                    } else {
                        console.log('User not found.');
                    }
                }
            });
        } catch (error) {
            console.log('Error updating password:', error);
        }
    }

    return (
        <main className='backgroundLogin login-container'>
            <section className=' forgot-pass'>
                <div>
                    <h3 className='fs-bold text-uppercase text-success border-bottom border-5 border-warning px-3'>Forgot Password</h3>
                </div>
                <form  className='form-style2'>
                    <div className='d-flex flex-column w-100 mt-3'>
                        <label htmlFor='text'>Your User Name</label>
                        <input value={formData.userName} onChange={handleInputChange} type='text' className='p-2 rounded-3' id='userName' placeholder='Your User Name' required />
                    </div>
                    <div className='d-flex flex-column w-100'>
                        <label htmlFor='password'>New Password</label>
                        <input value={formData.newPassword} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} className='p-2 rounded-3' id='newPassword' placeholder='New Password' required />
                    </div>
                    <div className='d-flex flex-column w-100'>
                        <label htmlFor='new-password'>Confirm Password</label>
                        <input value={formData.confirmPassword} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} className='p-2 rounded-3' id='confirmPassword' placeholder='Confirm Password' required />
                    </div>
                    <div className='d-flex justify-content-end w-100'>
                        <button type='button' className='d-flex w-100 justify-content-end btn-sm' style={{border: 'none', backgroundColor: 'transparent', color: 'green'}} onClick={handleTogglePassword} >
                            Show Password: {showPassword ? <IconPark path={'ooui:eye'} size={24}/> : <IconPark path={'mdi:eye-off'} size={24}/>}
                        </button>
                    </div>
                    <div className='d-flex align-items-center w-100 justify-content-start p-0 container'>
                        <span onClick={() => navigate('/auth/user-login')} style={{cursor: 'pointer', fontSize: '16px'}} className='text-warning'>Click here to return</span>
                    </div>
                    <div className='comp'>
                        <button type='button' onClick={handleUpdatePassword} className='btn btn-outline-success w-100 px-4'><strong>Update Password</strong></button>
                    </div>
                    
                </form>
            </section>
        </main>
    )
}

export default ForgotPassword