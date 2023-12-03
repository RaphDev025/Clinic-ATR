import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from 'assets/logo/ATR Skin Care Logo.png';
import { useAuth } from 'Context/AuthContext'; // Import the useAuth hook

const LoginPage = () => {
    const { login, setUser } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Fetch all user data
            const response = await fetch('https://clinic-api-two.vercel.app/api/users');
            const allUserData = await response.json();

            // Iterate through fetched data to find the user
            const user = allUserData.find((user) => user.email === email && user.password === password);
            console.log(user)
            if (user) {
                // Store all user data in AuthContext
                console.log(user)
                login(user);

                // Redirect based on user type
                navigate(user.user_type === 'admin' ? '/admin/dashboard' : '/featured');
            } else {
                // Handle authentication failure
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <main className='backgroundLogin container-fluid d-flex p-5 m-0 vh-100'>
            <section className='container d-flex gap-2 justify-content-between m-0 p-5'>
                <div className='p-5 w-75'>
                    <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center gap-3 align-items-start '>
                        <div>
                            <h1 className='fs-bold text-uppercase text-success border-bottom border-5 border-warning px-3'>Login</h1>
                        </div>
                        <div className='d-flex flex-column w-50 gap-3'>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    className='p-2 rounded-3'
                                    id='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type='password'
                                    className='p-2 rounded-3'
                                    id='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='d-flex justify-content-start w-100'>
                                <Link to='/auth/forgot-password' className='text-decoration-none text-warning'>
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className='d-flex justify-content-end w-100'>
                                <button type='submit' className='btn btn-success btn-sm text-uppercase py-2 w-50'>
                                    Log In
                                </button>
                            </div>
                        </div>
                        <div className='text-success'>
                            Don't have an account yet? 
                            <Link to='/auth/register' className='text-decoration-none text-warning'> Register here</Link>
                        </div>
                    </form>
                </div>
                <div className='p-2 col-3 gap-3 d-flex flex-column justify-content-center'>
                    <img src={logo} alt={logo} width={'100%'} style={{ opacity: '40%' }} />
                    <h1 className='text-warning text-end text-wrap text-uppercase fw-medium'>
                        Elevate your skin care with us
                    </h1>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;
