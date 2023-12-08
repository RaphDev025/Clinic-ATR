import React, { useState, useEffect } from 'react';
import vector from 'assets/extra/camera.png';
import { IconPark } from 'assets/SvgIcons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'Context/AuthContext';

const Profile = () => {
    const { user, login, logout } = useAuth()
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        _id: '',
        first_name: '',
        last_name: '',
        user_name: '',
        email: '',
        password: '',
        gender: '',
        address: '',
        phone: '',
        profile: ''
        // Add more fields as needed
    })
    const [passwordStrength, setPasswordStrength] = useState('Weak');

    useEffect(() => {
        if (user) {
            setUserDetails({
                _id: user._id || '',
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                user_name: user.user_name || '',
                password: user.password || '',
                email: user.email || '',
                gender: user.gender || '',
                address: user.address || '',
                phone: user.phone || '',
                profile: user.profile || '',
                // Add more fields as needed
            });
            console.log(user)
        } else {
            navigate('/')
        }
    }, [user]);

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setUserDetails((prevData) => ({
            ...prevData,
            'profile': base64,
        }));
    };

    const criteria = [
        { regex: /[a-z]/, weight: 1, description: 'lowercase letters' },
        { regex: /[A-Z]/, weight: 1, description: 'uppercase letters' },
        { regex: /[0-9]/, weight: 1, description: 'numbers' },
        { regex: /[^a-zA-Z0-9]/, weight: 2, description: 'special characters' },
        { regex: /.{8,}/, weight: 2, description: 'at least 8 characters' },
    ];

    const checkPasswordStrength = (password) => {
        // ... (existing checkPasswordStrength function)

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
        // Update the userDetails state based on the input field
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }));
        if (id === 'password') {
            const strength = checkPasswordStrength(value);
            setPasswordStrength(strength);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://clinic-atr-server-inky.vercel.app/api/users/${userDetails._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            });

            if (response.ok) {
                // Handle success, e.g., show a success message or redirect
                alert('User details updated successfully')
                login(userDetails)
            } else {
                // Handle errors, e.g., show an error message
                alert('Failed to update user details');
            }
        } catch (error) {
            console.log('Error updating user details:', error);
        }
    };
    
    const handleLogout = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        logout();
        navigate('/auth/user-login');
    }

    return (
        <main id='profile' className='container-fluid vh-100'>
            <section className='opaque-background rounded-2 container px-3 py-4 d-flex flex-column gap-4'>
                <h6 className='m-0 fw-bold text-warning d-flex justify-content-between'>
                    <span>Profile</span>{' '}
                    <button
                        className='btn btn-outline-success'
                        type='button'
                        onClick={handleLogout}
                    >
                        <IconPark path={'ic:baseline-logout'} size={20} /> Logout
                    </button>
                </h6>
                <section className='p-5 rounded-3' style={{ backgroundColor: '#B2B2B280' }}>
                {userDetails._id && (
                    <form onSubmit={handleSave} >
                        <div className='d-flex gap-3'>
                            <div className='d-flex flex-column w-50'>
                                <label htmlFor='profile' className='p-4 w-100 rounded-5 bg-secondary'>
                                    <img alt={vector} width={'100%'} src={userDetails.profile || vector} />
                                </label>
                                <input onChange={(e) => handleFileUpload(e)} type='file' lable='Image' className='p-2 rounded-3' id='profile' name='image-upload' accept='.jpeg, .png, .jpg' />
                            </div>
                            <div className='d-flex flex-column justify-content-end w-100'>
                                <label htmlFor='first_name'>First Name</label>
                                <input type='text' value={userDetails.first_name} onChange={handleChange} className='p-2 rounded-3' id='first_name' placeholder='First Name' required />
                            </div>
                            <div className='d-flex flex-column justify-content-end w-100'>
                                <label htmlFor='last_name'>Last Name</label>
                                <input type='text' value={userDetails.last_name} onChange={handleChange} className='p-2 rounded-3' id='last_name' placeholder='Last Name' required />
                            </div>
                        </div>

                        <div className='d-flex gap-3'>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='user_name'>User Name</label>
                                <input type='text' value={userDetails.user_name} onChange={handleChange} className='p-2 rounded-3' id='user_name' placeholder='User Name' required />
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='email'>Email</label>
                                <input type='email' value={userDetails.email} onChange={handleChange} className='p-2 rounded-3' id='email' placeholder='Email' required />
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='password'>Password</label>
                                <input type='password' value={userDetails.password} onChange={handleChange} className='p-2 rounded-3' id='password' placeholder='Password' required />
                            </div>
                        </div>

                        <div className='d-flex gap-3'>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='gender'>Gender</label>
                                <input type='text' value={userDetails.gender} onChange={handleChange} className='p-2 rounded-3' id='gender' placeholder='Gender' required />
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='tel'>Phone</label>
                                <input type='tel' value={userDetails.phone} onChange={handleChange} className='p-2 rounded-3' id='tel' placeholder='Phone' required />
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='address'>Address</label>
                                <input type='address' value={userDetails.address} onChange={handleChange} className='p-2 rounded-3' id='address' placeholder='Address' required />
                            </div>
                        </div>

                        <div className='w-100 d-flex justify-content-end align-items-end py-3'>
                        {userDetails.password && ( // Only show if password is not null
                                <div className='user-inputs password-strength w-100'>
                                    <label className='w-100'>Password Strength:</label>
                                    <div className={`password-strength-indicator ps-2 ${passwordStrength.toLowerCase()}`}>
                                        {passwordStrength}
                                    </div>
                                </div>
                            )}
                            <button className='btn-success w-25 btn' type='submit'>Save</button>
                        </div>
                    </form>
                    )}
                </section>
            </section>
        </main>
    );
};

export default Profile;
