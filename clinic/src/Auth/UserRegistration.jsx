import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconPark } from 'assets/SvgIcons'

const UserRegistration = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState('Weak');

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        user_name: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
        user_type: 'customer',
        password: '',
    })
    const [error, setError] = useState(null)

    const checkPasswordStrength = (password) => {
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

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }))

        if (id === 'password') {
            const strength = checkPasswordStrength(value);
            setPasswordStrength(strength);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your form submission logic here using formData
        const response = await fetch('https://clinic-atr-server-inky.vercel.app/api/users', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        alert('Account Registered')
        if(!response.ok){
            setError(json.error)
            alert(error)
        }
        if(response.ok){
            setError(null)
            setFormData({
                first_name: '',
                last_name: '',
                user_name: '',
                gender: '',
                address: '',
                phone: '',
                email: '',
                user_type: 'customer',
                password: '',
            })
        }
    }

    return (
        <main className='backgroundLogin registration-container m-0 vh-100'>
            <section className='inner-registration-container m-0'>
                <div className='header text-center'>
                    <h1 className='fs-bold text-uppercase text-success border-bottom border-5 border-warning px-3'><strong>Register Account</strong></h1>
                </div>
                <form onSubmit={handleSubmit} className='register-form'>
                    {/* First & Last Name*/}
                    <div role='group' className='group-fields'>
                        <div className='user-inputs'>
                            <label htmlFor='first_name'>First Name</label>
                            <input type='text' className='p-2 rounded-3' id='first_name' placeholder='First Name' value={formData.first_name} onChange={handleChange} required />
                        </div>
                        <div className='user-inputs'>
                            <label htmlFor='last_name'>Last Name</label>
                            <input type='text' className='p-2 rounded-3' id='last_name' placeholder='Last Name' value={formData.last_name} onChange={handleChange} required />
                        </div>
                        <div className='user-inputs'>
                            <label htmlFor='user_name'>User Name</label>
                            <input type='text' className='p-2 rounded-3' id='user_name' placeholder='User Name' value={formData.user_name} onChange={handleChange} required />
                        </div>
                    </div>
                    {/* Gender, Address & Mobile Number*/}
                    <div role='group' className='group-fields'>
                        <div className='user-inputs gender'>
                            <select defaultValue='' className='p-2 dropdown rounded-3 border-success' name="gender" id="gender" onChange={handleChange}>
                                <option value='' disabled>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className='user-inputs'>
                            <label htmlFor='address'>Address</label>
                            <input type='text' className='p-2 rounded-3' id='address' placeholder='Address' value={formData.address} onChange={handleChange} required />
                        </div>
                        <div className='user-inputs'>
                            <label htmlFor='phone'>Mobile Phone</label>
                            <input type='tel' pattern="[0-9]*" className='p-2 rounded-3' id='phone' placeholder='Mobile Phone' value={formData.phone} onChange={handleChange} required />
                        </div>
                    </div>
                    {/* Email & Password*/}
                    <div role='group' className='group-fields'>
                        <div className='user-inputs '>
                            <label htmlFor='email'>Email</label>
                            <input type='email' className='p-2 rounded-3' id='email' placeholder='Email' value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className='user-inputs'>
                            <label htmlFor='password'>Password</label>
                            <input type={showPassword ? 'text' : 'password'} className='p-2 rounded-3' id='password' placeholder='Password' value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className='d-flex justify-content-start align-items-end'>
                            <button type='button' className='d-flex justify-content-start btn-sm' style={{border: 'none', backgroundColor: 'transparent',  width: '300px', color: 'green'}} onClick={handleTogglePassword} >
                                Show Password: {showPassword ? <IconPark path={'ooui:eye'} size={24}/> : <IconPark path={'mdi:eye-off'} size={24}/>}
                            </button>
                        </div>
                    </div>

                    <div className='submit-button'>
                        <button className='btn btn-outline-success px-4' type='submit'><strong>Create Account</strong></button>
                        {formData.password && (
                            <div className='user-inputs password-strength w-100'>
                                <label className='w-100'>Password Strength:</label>
                                <div className={`password-strength-indicator ps-2 ${passwordStrength.toLowerCase()}`}>
                                    {passwordStrength}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='d-flex align-items-center justify-content-start p-0 container'>
                        <span className='txt text-success'>Already have an account?</span>
                        <Link to='/auth/user-login' className='text-warning text-decoration-none'><span className='txt ms-2 lnk'>Sign In here</span></Link>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default UserRegistration