import React, { useState, useEffect } from 'react'
import { GradientHeader } from 'Components'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useCart } from 'Context/CartContext'
import { IconPark } from 'assets/SvgIcons'
import { useNavigate } from 'react-router-dom';

const ViewItem = () => {
    const { itemData } = useCart()
    const navigate = useNavigate()

    const [item, setItem] = useState({
        item_id: '',
        item_name: '',
        qty: 1,
        unit_price: 1,
        total_amount: 0,
        shipping: '',
        courier: ''
    })

    useEffect(() => {
        // Update item_name, item_id, unit_price when itemData changes
        setItem((prevItem) => ({ ...prevItem, item_name: itemData.item_name, item_id: itemData._id, unit_price: itemData.unit_price, }));
    
        // Update total_amount whenever qty or unit_price changes
        setItem((prevItem) => ({ ...prevItem, total_amount: prevItem.qty * prevItem.unit_price, }));
    }, [itemData, item.qty, item.unit_price]);

    const handleDecrement = () => { 
        setItem((prevItem) => ({ ...prevItem, qty: Math.max(1, prevItem.qty - 1) }))
    }

    const handleIncrement = () => {
        setItem((prevItem) => ({ ...prevItem, qty: prevItem.qty + 1 }))
    }

    const handleQuantityChange = (event) => {
        // Ensure the quantity is a positive integer
        const newQuantity = Math.max(1, parseInt(event.target.value, 10) || 1);
        setItem((prevItem) => ({ ...prevItem, qty: newQuantity }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your form submission logic here using formData
        const response = await fetch('https://clinic-api-two.vercel.app/api/cart', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        console.log(json)

        if(!response.ok){
            alert('Cart Item Not Uploaded')
            setItem({
                item_name: '',
                qty: 1,
                unit_price: 1,
                total_amount: 0,
                shipping: '',
                courier: ''
            })
        }
        if(response.ok){
            alert('Cart Item Uploaded')
            setItem({
                item_name: '',
                qty: 1,
                unit_price: 1,
                total_amount: 0,
                shipping: '',
                courier: ''
            })
            navigate('/featured')
        }
    }

    return (
        <main className='container-fluid bg-main d-flex pt-2 p-0 m-0 vh-100'>
            <section className='container-fluid p-3 mt-5 overflow-y-auto' >
                <GradientHeader title={'ATR Skin Care Shop'} />
                <form onSubmit={handleSubmit} className='m-3 d-flex align-items-start rounded-3' style={{backgroundColor: '#00FF3812'}}>
                    <div className='w-50 p-3 d-flex justify-content-center'>
                        <img src={itemData.product_img } alt='prod' height='500px' />
                    </div>
                    <div className='flex-column w-50 rounded-2 p-3 bg-light text-light d-flex justify-content-start align-items-start gap-3'>
                        <div className='d-flex flex-column gap-3 w-100'>
                            <h1 className='card-title fw-bold text-dark mb-3 text-wrap w-100'>{item.item_name}</h1>
                            <p className='card-text text-success fw-medium fs-6'>Selling at: P {item.unit_price}.00</p>
                            <div className='d-flex justify-content-between text-dark'>
                                <p>Best Seller</p>
                                <p>Sold</p>
                            </div>
                            <div className='d-flex flex-column'>
                                <h6 className='fw-bold text-dark'>Quantity</h6>
                                <div className='d-flex'>
                                    <button type='button' className='btn btn-sm btn-outline-secondary' onClick={handleDecrement}><IconPark path={'ic:round-minus'} /></button>
                                    <input type='number' onChange={handleQuantityChange} id='qty' min={1} value={item.qty} className='text-center bg-light rounded-3' style={{width: '50px'}} />
                                    <button type='button' className='btn btn-sm btn-outline-secondary' onClick={handleIncrement}><IconPark path={'ic:round-plus'} /></button>
                                </div>
                                {itemData.qty === 0 ? (<pre className='text-danger fst-italic m-0'>*Out of Stock</pre>) : ''}
                            </div>
                            <div className='d-flex gap-2 w-100'>
                                <button type='button' onClick={() => setItem({...item, shipping: 'For Pick-up', courier: 'None'})} className={`w-100 btn ${item.shipping === 'For Pick-up' ? 'btn-success' : 'btn-outline-success'} btn-sm`}>For Pick-up</button>
                                <button type='button' onClick={() => setItem({...item, shipping: 'For Delivery'})} className={`w-100 btn ${item.shipping === 'For Delivery' ? 'btn-success' : 'btn-outline-success'} btn-sm`}>For Delivery</button>
                            </div>
                            { item.shipping === 'For Delivery' 
                            ? <>
                                <div className='d-flex flex-column gap-2 w-100'>
                                    <h6 className='text-dark fw-bold'>Select Delivery Option:</h6>
                                    <button type='button' onClick={() => setItem({...item, courier: 'Toktok'})} className={`w-100 btn ${item.courier === 'Toktok' ? 'btn-success' : 'btn-outline-success'} btn-sm`}>Toktok</button>
                                    <button type='button' onClick={() => setItem({...item, courier: 'Lalamove'})} className={`w-100 btn ${item.courier === 'Lalamove' ? 'btn-success' : 'btn-outline-success'} btn-sm`}>Lalamove</button>
                                    <button type='button' onClick={() => setItem({...item, courier: 'Angkas'})} className={`w-100 btn ${item.courier === 'Angkas' ? 'btn-success' : 'btn-outline-success'} btn-sm`}>Angkas</button>
                                    <button type='button' onClick={() => setItem({...item, courier: 'Grab'})} className={`w-100 btn ${item.courier === 'Grab' ? 'btn-success' : 'btn-outline-success'} btn-sm`}>Grab</button>
                                </div>
                            </>
                            : item.shipping === 'For Pick-up' 
                                ?   <>
                                        <p className='text-danger fst-italic' style={{fontSize: '12px'}}>*Orders labeled 'For Pick-Up' must be claimed within 2 days to avoid cancellation.</p>
                                    </>
                                : <></>
                            }
                        </div>
                        <div className='d-flex gap-3 w-100'>
                            <button type='submit' className={`w-100 btn ${itemData.qty === 0 ? 'btn-outline-secondary disabled' : 'btn-outline-success'} py-2 px-3 text-uppercase `}>Add to Cart <IconPark path={'iconoir:add-to-cart'} size={18} /></button>
                            <button type='submit' className={`w-100 btn ${itemData.qty !== 0 ? 'btn-outline-secondary disabled' : 'btn-outline-success'} py-2 px-3 text-uppercase `}>Pre-Order <IconPark path={'ph:basket-bold'} size={18} /></button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default ViewItem
