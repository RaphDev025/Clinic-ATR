import React, { useState, useEffect } from 'react'
import { IconPark } from 'assets/SvgIcons'
import vector from 'assets/extra/camera.png'

const ViewItem = ({ selectedItem }) => {

    const [formData, setFormData] = useState({
        item_name: '',
        qty: 0,
        unit_price: 0,
        product_img: ''
    })

    useEffect(() => {
        if (selectedItem) {
            setFormData({
                item_name: selectedItem.item_name || '',
                qty: selectedItem.qty || 0,
                unit_price: selectedItem.unit_price || 0,
                product_img: selectedItem.product_img || '',
                _id: selectedItem._id || null, // Make sure _id is set correctly
            });
        }
    }, [selectedItem]);
    

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }

    const handleUpdate = async () => {
        if (!formData._id) {
            console.error('Item ID is missing');
            return;
        }
    
        try {
            const response = await fetch(`https://clinic-api-two.vercel.app/api/products/${formData._id}`, {
                method: 'PATCH',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const json = await response.json();
    
            if (!response.ok) {
                alert('Product Not Updated')
                console.error(json)
            } else {
                alert('Product Updated')
                console.log(json)
                window.location.reload()
                // Optionally, you can reset the form or perform other actions after a successful update
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    }    

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
            'product_img': base64,
        }));
    }

    return (
        <div className='modal fade' id='viewItem' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className='modal-dialog'>
                <div className='modal-content' style={{background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.175)'}}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-light" id="staticBackdropLabel">View item</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleUpdate} className='d-flex flex-column gap-2'>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='item_name' >Product Name</label>
                                <input type='text' onChange={handleChange} value={formData.item_name} id='item_name' className='p-2 bg-light rounded-3 w-100' placeholder='Product Name' required />
                            </div>
                            <div className='d-flex gap-3'>
                                <div className='d-flex flex-column w-100'>
                                    <label htmlFor='unit_price' >Unit Price</label>
                                    <input type='number' onChange={handleChange} value={formData.unit_price} min={1} id='unit_price' className='p-2 bg-light rounded-3 w-100' placeholder='Unit Price' required />
                                </div>
                                <div className='d-flex flex-column w-100'>
                                    <label htmlFor='qty' >Quantity</label>
                                    <input type='number' onChange={handleChange} value={formData.qty} min={1} id='qty' className='p-2 bg-light rounded-3 w-100' placeholder='Quantity' required />
                                </div>
                            </div>
                            <div className='d-flex gap-3 align-items-center'>
                                <div className='d-flex flex-column w-25'>
                                    <label htmlFor='product_img' className='p-4 w-100 rounded-5 bg-secondary'>
                                        <img alt={vector} width={'100%'} src={formData.product_img || vector} />
                                    </label>
                                    <input onChange={(e) => handleFileUpload(e)} type='file' lable='Image' className='p-2 rounded-3' id='product_img' name='image-upload' accept='.jpeg, .png, .jpg' />
                                </div>
                                <span style={{fontSize: '12px'}}>Click to Upload Product Image <br /> Only Accepts .jpg, .png, .jpeg files and max of 100kb</span>
                            </div>
                            <div className='py-2 px-0 d-flex modal-footer justify-content-between'>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" data-bs-dismiss="modal" className="btn btn-success"><IconPark path={'radix-icons:update'}  /> Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewItem