import React, { useState } from 'react'
import vector from 'assets/extra/camera.png'

const ContentMgmt = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        post_img: ''
    })
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your form submission logic here using formData
        const response = await fetch('https://clinic-api-two.vercel.app/api/articles', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            alert('Article Not Uploaded')
            console.log(json)
            setFormData({
                title: '',
                description: '',
                post_img: ''
            })
        }
        if(response.ok){
            alert('Article Uploaded')
            console.log(json)
            setFormData({
                title: '',
                description: '',
                post_img: ''
            })
        }
    };

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
        <main id='content' className=' container-fluid pb-3 '> 
            <section className='opaque-background rounded-2 container px-3 py-4 d-flex flex-column gap-4'> 
                <h6 className='m-0 fw-bold text-warning '>Content</h6>
                <form onSubmit={handleSubmit} className=' d-flex flex-column gap-3'>
                    <div className='d-flex justify-content-between'>
                        <h4 className='text-light'>Create new Article</h4>
                    </div>
                    <div className='d-flex gap-3 align-items-end'>
                        <div className='d-flex flex-column w-25'>
                            <label htmlFor='post_img' className='p-4 w-100 rounded-5 bg-secondary'>
                                <img alt={vector} width={'100%'} src={formData.post_img || vector} />
                            </label>
                            <input onChange={(e) => handleFileUpload(e)} type='file' lable='Image' className='p-2 rounded-3' id='post_img' name='image-upload' accept='.jpeg, .png, .jpg' />
                        </div>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='title'>Title</label>
                            <input type='text' className='p-2 rounded-3' id='title' value={formData.title} placeholder='Title' onChange={handleChange} required />
                        </div>
                    </div>
                    <div>
                        <textarea placeholder='Description' id='description' value={formData.description} onChange={handleChange} className='rounded-3 w-100 p-3' rows='10' style={{resize: 'none'}}></textarea>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-success px-3' type='submit'>Post</button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default ContentMgmt