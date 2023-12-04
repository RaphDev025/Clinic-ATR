import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

    const ForgotPassword = () => {

    const navigate = useNavigate()
    const [userName, setUserName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const handleUpdatePassword = async () => {
        try {
          // Fetch user data from the provided API endpoint
          const response = await fetch(`https://clinic-atr-server-inky.vercel.app/api/users/${userName}`);
          const userData = await response.json();
    
          // Check if user exists
          if (userData) {
            // Check if newPassword and confirmPassword match
            if (newPassword === confirmPassword) {
              // Update password using the PATCH method and the provided API endpoint
              await fetch(`https://clinic-atr-server-inky.vercel.app/api/update-password/${userName}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
              });
              alert('Password updated successfully!');
            } else {
              alert('New password and confirm password do not match!');
            }
          } else {
            alert('User not found. Please enter a valid username.');
          }
        } catch (error) {
          console.error('Error updating password:', error);
        }
      };

    return (
        <main className='backgroundLogin login-container'>
            <section className=' forgot-pass'>
                <div>
                    <h3 className='fs-bold text-uppercase text-success border-bottom border-5 border-warning px-3'>Forgot Password</h3>
                </div>
                <form className='form-style2'>
                    <div className='d-flex flex-column w-100 mt-3'>
                        <label htmlFor='text'>Your User Name</label>
                        <input value={userName} onChange={(e) => setUserName(e.target.value)} type='text' className='p-2 rounded-3' id='user_name' placeholder='Your User Name' required />
                    </div>
                    <div className='d-flex flex-column w-100'>
                        <label htmlFor='password'>New Password</label>
                        <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type='password' className='p-2 rounded-3' id='password' placeholder='New Password' required />
                    </div>
                    <div className='d-flex flex-column w-100'>
                        <label htmlFor='new-password'>Confirm Password</label>
                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' className='p-2 rounded-3' id='new-password' placeholder='Confirm Password' required />
                    </div>
                    <div className='d-flex align-items-center w-100 justify-content-start p-0 container'>
                        <span onClick={() => navigate('/auth/user-login')} style={{cursor: 'pointer', fontSize: '16px'}} className='text-warning'>Click here to return</span>
                    </div>
                    <div className='comp'>
                        <button onClick={() => handleUpdatePassword()} className='btn btn-outline-success w-100 px-4'><strong>Update Password</strong></button>
                    </div>
                    
                </form>
            </section>
        </main>
    )
}

export default ForgotPassword