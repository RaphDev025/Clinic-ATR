import React, { useState, useEffect } from 'react';
import { GradientHeader } from 'Components';
import { IconPark } from 'assets/SvgIcons';
import { useItems } from 'Context/ItemsContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'Context/AuthContext';
import { usePreOrder } from 'Context/PreOrderContext';

const ConfirmPreOrder = () => {
    const { preOrderDetails, setDetails, resetDetails } = usePreOrder();
    const { user } = useAuth();
    const { items, resetItems } = useItems()
    const navigate = useNavigate()
    const [itemStates, setItemStates] = useState({
        user_id: preOrderDetails.user_id,
        user_name: preOrderDetails.user_name,
        phone: preOrderDetails.phone,
        address: preOrderDetails.address,
        shipping: preOrderDetails.shipping,
        courier: preOrderDetails.courier,
        total_amount: preOrderDetails.total_amount,
        total_qty: preOrderDetails.qty,
        item_id: preOrderDetails.item_id,
        item_name: preOrderDetails.item_name,
        unit_price: preOrderDetails.unit_price
    })
    useEffect(() => {
        if (!user) {
            navigate('/auth/user-login')
        }
    }, [user]);
    const handleCancel = () => {
        resetItems()
        navigate('/cart')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Add your form submission logic here using formData
        const response = await fetch('https://clinic-atr-server-inky.vercel.app/api/pre-order', {
            method: 'POST',
            body: JSON.stringify(itemStates),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        console.log(json)
        if(!response.ok){
            alert('Pre Order Un-Successful!')
            setItemStates({
                user_id: '',
                user_name: '',
                phone: '',
                address: '',
                shipping: '',
                courier: '',
                total_amount: '',
                total_qty: '',
                item_id: '',
                item_name: '',
                unit_price: ''
            })
        }
        if(response.ok){
            alert('Pre Order Successful!')
            setItemStates({
                user_id: '',
                user_name: '',
                phone: '',
                address: '',
                shipping: '',
                courier: '',
                total_amount: '',
                total_qty: '',
                item_id: '',
                item_name: '',
                unit_price: ''
            })
            navigate('/featured')
        }
    }  

    return (
        <main className='container-fluid bg-main d-flex p-0 m-0 vh-100 '>
            <section className='container-fluid p-3 overflow-y-auto'>
                <GradientHeader title={'Order Confirmation'} />
                <button onClick={handleCancel} className='btn text-success'>
                    <IconPark size={25} path={'bx:arrow-back'} /> Go Back
                </button>
                <div className='p-3 container d-flex flex-column'>
                    <div className='d-flex gap-2 bg-light border border-1 p-2 rounded-2' style={{ fontSize: '12px' }}>
                        <span className='w-100 m-0 text-center fw-bold'>Product</span>
                        <span className='w-100 m-0 text-center fw-bold'>Unit Price</span>
                        <span className='w-100 m-0 text-center fw-bold'>Quantity</span>
                        <span className='w-100 m-0 text-center fw-bold'>Sub Total</span>
                    </div>
                    <div className='py-3 pe-0 px-0 d-flex gap-3 flex-column rounded-3 overflow-y-scroll' style={{height: '500px'}}>
                       
                            <div className='rounded-2 p-3 align-items-center border border-1 d-flex w-100' style={{ fontSize: '12px' }} key={preOrderDetails._id} >
                                <div className='d-flex align-items-center w-100'>
                                    <span className='m-0 w-50 text-start'>{preOrderDetails.item_name}</span>
                                </div>
                                <span className='m-0 w-100 text-center'>Php {preOrderDetails.unit_price}.00</span>
                                <span className='m-0 w-100 text-center'>{preOrderDetails.qty}pcs</span>
                                <span className='m-0 w-100 text-center'>Php {preOrderDetails.unit_price * preOrderDetails.qty}.00</span>
                            </div>
                      
                    </div>
                </div>
            </section>
            <form onSubmit={handleSubmit} className='position-fixed bottom-0 text-success container-fluid bg-success-subtle d-flex justify-content-end gap-4 fw-bold px-5 p-3' >
                <span className='rounded-3 p-3 border'>Total Quantity: {preOrderDetails.qty}</span>
                <span className='rounded-3 p-3 border'>Total Amount: Php {preOrderDetails.total_amount}.00</span>
                <button type='submit' className='btn btn-lg btn-success' >Pre-Order</button>
            </form>
        </main>
    );
};

export default ConfirmPreOrder;
