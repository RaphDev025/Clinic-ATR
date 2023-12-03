import React, { useState } from 'react'
import vector from 'assets/extra/camera.png'
import { useNavigate } from 'react-router-dom'
import {IconPark} from 'assets/SvgIcons'

const UserProfile = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        post_img: ''
    })

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file)
        setFormData((prevData) => ({
            ...prevData,
            'post_img': base64,
        }));
    }  

    return (
        <main id='profile' className=' container-fluid vh-100 '> 
            <section className='opaque-background rounded-2 container px-3 py-4 d-flex flex-column gap-4'> 
                <h6 className='m-0 fw-bold text-warning d-flex justify-content-between'><span>Profile</span> <button className='btn' type='button' onClick={() => (navigate('/auth/user-login'))}><IconPark path={'ic:baseline-logout'} size={20} />Logout</button></h6>
                <section className='p-5 rounded-3 ' style={{backgroundColor: '#B2B2B280'}}>
                    <form className=''>
                        <div className='d-flex gap-3'>
                            <div className='d-flex flex-column w-50'>
                                <label htmlFor='post_img' className='p-4 w-100 rounded-5 bg-secondary'>
                                    <img alt={vector} width={'100%'} src={formData.post_img || vector} />
                                </label>
                                <input onChange={(e) => handleFileUpload(e)} type='file' lable='Image' className='p-2 rounded-3' id='post_img' name='image-upload' accept='.jpeg, .png, .jpg' />
                            </div>
                            <div className='d-flex flex-column justify-content-end w-100'>
                                <label htmlFor='first_name'>First Name</label>
                                <input type='text' className='p-2 rounded-3' id='first_name' placeholder='First Name' required />
                            </div>
                            <div className='d-flex flex-column justify-content-end w-100'>
                                <label htmlFor='last_name'>Last Name</label>
                                <input type='text' className='p-2 rounded-3' id='last_name' placeholder='Last Name' required />
                            </div>
                        </div>

                        <div className='d-flex gap-3'>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='user_name'>User Name</label>
                                <input type='text' className='p-2 rounded-3' id='user_name' placeholder='User Name' required />
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='email'>Email</label>
                                <input type='email' className='p-2 rounded-3' id='email' placeholder='Email' required />
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='password'>Password</label>
                                <input type='password' className='p-2 rounded-3' id='password' placeholder='Password' required />
                            </div>
                        </div>

                        <div className='d-flex gap-3'>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='gender'>Gender</label>
                                <input type='text' className='p-2 rounded-3' id='gender' placeholder='Gender' required />
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='tel'>Phone</label>
                                <input type='tel' className='p-2 rounded-3' id='tel' placeholder='Phone' required />
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='address'>Address</label>
                                <input type='address' className='p-2 rounded-3' id='address' placeholder='Address' required />
                            </div>
                        </div>

                        <div className='w-100 d-flex justify-content-end align-items-end py-3'>
                            <button className='btn-success w-25 btn'>Save</button>
                        </div>
                    </form>
                </section>
            </section>
        </main>
    )
}

export default UserProfile