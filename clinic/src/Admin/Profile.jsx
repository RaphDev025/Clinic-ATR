import React, { useState, useEffect } from 'react';
import vector from 'assets/extra/camera.png';
import { IconPark } from 'assets/SvgIcons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'Context/AuthContext';

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        post_img: '', // Initialize with an empty string or default value
        first_name: '',
        last_name: '',
        user_name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                user_name: user.user_name || '',
                email: user.email || '',
                password: user.password || '',
            });
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
        setFormData((prevData) => ({
            ...prevData,
            post_img: base64,
        }));
    };

    const handleInputChange = (field, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`https://clinic-api-two.vercel.app/api/users/${user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                console.log('Profile updated successfully!', responseData);
            } else {
                console.error('Failed to update profile:', responseData);
            }
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };
    

    return (
        <main id='profile' className='container-fluid vh-100'>
            <section className='opaque-background rounded-2 container px-3 py-4 d-flex flex-column gap-4'>
                <h6 className='m-0 fw-bold text-warning d-flex justify-content-between'>
                    <span>Profile</span>{' '}
                    <button
                        className='btn btn-outline-success'
                        type='button'
                        onClick={() => navigate('/auth/user-login')}
                    >
                        <IconPark path={'ic:baseline-logout'} size={20} /> Logout
                    </button>
                </h6>
                <section className='p-5 rounded-3' style={{ backgroundColor: '#B2B2B280' }}>
                    <form onSubmit={handleSave}>
                        <div className='d-flex gap-3'>
                            <div className='d-flex flex-column w-50'>
                                <label htmlFor='post_img' className='p-4 w-100 rounded-5 bg-secondary'>
                                    <img alt={vector} width={'100%'} src={formData.post_img || vector} />
                                </label>
                                <input
                                    onChange={(e) => handleFileUpload(e)}
                                    type='file'
                                    label='Image'
                                    className='p-2 rounded-3'
                                    id='post_img'
                                    name='image-upload'
                                    accept='.jpeg, .png, .jpg'
                                />
                            </div>
                            
                            <>
                            <div className='d-flex flex-column justify-content-end w-100'>
                                <label htmlFor='first_name'>First Name</label>
                                <input
                                    type='text'
                                    className='p-2 rounded-3'
                                    id='first_name'
                                    placeholder='First Name'
                                    value={formData.first_name}
                                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                                />
                            </div>
                            <div className='d-flex flex-column justify-content-end w-100'>
                                <label htmlFor='last_name'>Last Name</label>
                                <input
                                    type='text'
                                    className='p-2 rounded-3'
                                    id='last_name'
                                    placeholder='Last Name'
                                    value={formData.last_name}
                                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                                />
                            </div>
                            {/* Continue with other form fields using the user data */}
                            </>
                        </div>

                        {/* Continue with other form fields using the user data */}
                        
                        <div className='d-flex gap-3'>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='user_name'>User Name</label>
                                <input
                                    type='text'
                                    className='p-2 rounded-3'
                                    id='user_name'
                                    placeholder='User Name'
                                    value={formData.user_name}
                                    onChange={(e) => handleInputChange('user_name', e.target.value)}
                                />
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    className='p-2 rounded-3'
                                    id='email'
                                    placeholder='Email'
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type='password'
                                    className='p-2 rounded-3'
                                    id='password'
                                    placeholder='Password'
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                />
                            </div>
                        </div>
                        

                        <div className='w-100 d-flex justify-content-end align-items-end py-3'>
                            <button className='btn-success w-25 btn' type='submit'>Save</button>
                        </div>
                    </form>
                </section>
            </section>
        </main>
    );
};

export default Profile;
