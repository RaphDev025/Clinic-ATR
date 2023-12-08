import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from 'assets/logo/ATR Skin Care Logo.png';
import { useAuth } from 'Context/AuthContext'; // Import the useAuth hook
import { IconPark } from 'assets/SvgIcons'

const LoginPage = () => {
    const { login, setUser } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('Weak');

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const checkPasswordStrength = (password) => {
        // Your password strength logic (you can reuse the checkPasswordStrength function from the previous example)

        // For demonstration purposes, I'm using the previous logic
        const criteria = [
            { regex: /[a-z]/, weight: 1, description: 'lowercase letters' },
            { regex: /[A-Z]/, weight: 1, description: 'uppercase letters' },
            { regex: /[0-9]/, weight: 1, description: 'numbers' },
            { regex: /[^a-zA-Z0-9]/, weight: 2, description: 'special characters' },
            { regex: /.{8,}/, weight: 2, description: 'at least 8 characters' },
        ];

        const totalScore = criteria.reduce((score, criterion) => {
            return score + (criterion.regex.test(password) ? criterion.weight : 0);
        }, 0);

        if (totalScore >= 5) {
            return 'Strong';
        } else if (totalScore >= 3) {
            return 'Moderate';
        } else {
            return 'Weak';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Fetch all user data
            const response = await fetch('https://clinic-atr-server-inky.vercel.app/api/users');
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

    useEffect(() => {
        // Update password strength when the password changes
        const strength = checkPasswordStrength(password);
        setPasswordStrength(strength);
    }, [password]);

    return (
        <main className='backgroundLogin login-container m-0'>
            <section className='m-0 inner-container'>
                <div className='container-child'>
                    <form onSubmit={handleSubmit} className='form-style'>
                        <div>
                            <h1 className='fs-bold text-uppercase text-success border-bottom border-5 border-warning px-3'>Login</h1>
                        </div>
                        <div className='input-field-group'>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='email'>Email</label>
                                <input type='email' className='p-2 rounded-3' id='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='password'>Password</label>
                                <input type={showPassword ? 'text' : 'password'} className='p-2 rounded-3' id='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className='d-flex justify-content-end '>
                                <button type='button' className='d-flex justify-content-end btn-sm' style={{border: 'none', backgroundColor: 'transparent',     width: '300px', color: 'green'}} onClick={handleTogglePassword} >
                                    Show Password: {showPassword ? <IconPark path={'ooui:eye'} size={24}/> : <IconPark path={'mdi:eye-off'} size={24}/>}
                                </button>
                            </div>
                            <div className='d-flex justify-content-start w-100'>
                                <Link to='/auth/forgot-password' className='text-decoration-none text-warning'>
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className='d-flex justify-content-end align-items-end flex-column w-100'>
                                <button type='submit' className='btn btn-success btn-sm text-uppercase py-2 w-50'>
                                    Log In
                                </button>
                                {password && (
                                    <div className='user-inputs password-strength w-100'>
                                        <label className='w-100'>Password Strength:</label>
                                        <div className={`password-strength-indicator ps-2 ${passwordStrength.toLowerCase()}`}>
                                            {passwordStrength}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='text-success' style={{fontSize: '14px'}}>
                            Don't have an account yet? 
                            <Link to='/auth/register' className='text-decoration-none text-warning'> Register here</Link>
                        </div>
                    </form>
                </div>
                <div className='company'>
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
