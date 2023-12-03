import React, { useState, useEffect } from 'react';
import { GradientHeader } from 'Components';
import { IconPark } from 'assets/SvgIcons';
import { useItems } from 'Context/ItemsContext';
import { useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {
    const { items, resetItems } = useItems()
    const navigate = useNavigate()
    const [itemStates, setItemStates] = useState({
        user_name: 'Raphael',
        phone: '09269607368',
        address: '558 M De Jesus Street Pasay City',
        shipping: 'For Delivery',
        courier: '',
        total_amount: 0,
        total_qty: 0,
        item_list: [],
    })
    useEffect(() => {
        handleCompute()
    }, [])
    const handleCancel = () => {
        resetItems()
        navigate('/cart')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (itemStates.total_amount === 0) {
            alert('Your order is empty.');
            return; // Prevent form submission
        }
        // Ensure that handleCompute is called before submitting
        handleCompute();
        // Add your form submission logic here using formData
        const response = await fetch('https://clinic-api-two.vercel.app/api/ordering', {
            method: 'POST',
            body: JSON.stringify(itemStates),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        console.log(json)
        if(!response.ok){
            alert('Order Successful!')
            setItemStates({
                user_name: 'Raphael',
                phone: '09269607368',
                address: '558 M De Jesus Street Pasay City',
                shipping: 'For Delivery',
                courier: '',
                total_amount: 0,
                total_qty: 0,
                item_list: [],
            })
        }
        if(response.ok){
            alert('Order Successful!')
            setItemStates({
                user_name: 'Raphael',
                phone: '09269607368',
                address: '558 M De Jesus Street Pasay City',
                shipping: 'For Delivery',
                courier: '',
                total_amount: 0,
                total_qty: 0,
                item_list: [],
            })
            handleUpdateQtyAndDelete()
            navigate('/cart')
        }
    }  

    const handleUpdateQtyAndDelete = async () => {
        try {
          // Iterate over items and update product quantity
            for (const item of items) {
                const response = await fetch(`https://clinic-api-two.vercel.app/api/products/${item.item_id}`);
                const currentProduct = await response.json();
        
                if (!response.ok) {
                    console.error('Error fetching product data:', currentProduct.error);
                    // Handle error as needed
                    continue;
                }
            
                  // Calculate the new quantity (decreasing by current quantity)
                const updatedQty = currentProduct.qty - item.qty;
                const updateSoldCount = currentProduct.soldCount + item.qty;
                
                // Send PATCH request to update product quantity
                await fetch(`/api/products/${item.item_id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ qty: updatedQty, soldCount: updateSoldCount }), // Adjust the body as needed
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
        
            // Iterate over items and delete from cart
            for (const item of items) {
                const { _id: cartItemId } = item;
        
                // Send DELETE request to remove item from cart
                await fetch(`https://clinic-api-two.vercel.app/api/cart/${cartItemId}`, {
                    method: 'DELETE',
                });
            }
            // Reset items context after updating and deleting
            resetItems()
        // Navigate to a success page or perform other actions
        // ...
        } catch (error) {
            console.error('Error updating quantity and deleting items:', error);
            // Handle error as needed
        }
    };  

    const handleCompute = () => {
        let totalAmount = 0, total_qty = 0

        items.forEach(item => {
            const subtotal = item.unit_price * item.qty;
            totalAmount += subtotal;
            total_qty += item.qty;
        })

        const newItems = items.map(item => ({
            item_name: item.item_name,
            item_id: item.item_id,
            qty: item.qty,
            unit_price: item.unit_price,
            product_img: item.product.product_img // Assuming product_img is nested
        }))

        setItemStates({
            ...itemStates,
            total_amount: totalAmount,
            total_qty: total_qty,
            item_list: newItems
        })
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
                        {items.map((itm) => (
                            <div className='rounded-2 p-3 align-items-center border border-1 d-flex w-100' style={{ fontSize: '12px' }} key={itm._id} >
                                <div className='d-flex align-items-center w-100'>
                                    <span className='m-0 w-50 text-center'><img src={itm.product.product_img } alt={'lo'} width={'60px'}/></span>
                                    <span className='m-0 w-50 text-start'>{itm.item_name}</span>
                                </div>
                                <span className='m-0 w-100 text-center'>Php {itm.unit_price}.00</span>
                                <span className='m-0 w-100 text-center'>{itm.qty}pcs</span>
                                <span className='m-0 w-100 text-center'>Php {itm.unit_price * itm.qty}.00</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <form onSubmit={handleSubmit} className='position-fixed bottom-0 text-success container-fluid bg-success-subtle d-flex justify-content-end gap-4 fw-bold px-5 p-3' >
                <span className='rounded-3 p-3 border'>Total Quantity: {itemStates.total_qty}</span>
                <span className='rounded-3 p-3 border'>Total Amount: Php {itemStates.total_amount}.00</span>
                <button type='submit' className='btn btn-lg btn-success' >Order</button>
            </form>
        </main>
    );
};

export default ConfirmOrder;
