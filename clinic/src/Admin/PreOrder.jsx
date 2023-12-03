import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { format } from 'date-fns';
import { IconPark } from 'assets/SvgIcons'

const PreOrder = () => {
    const subHeaders = ['Item Code', 'Item Description', 'Quantity', 'Selling Price', 'Sub Total']

    const [orders, setOrders] = useState(null)
    const [totalOrders, setTotalOrders] = useState(null)
    const [loading, setLoading] = useState(true)

    // Fetching Data from Database
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await fetch('https://clinic-api-two.vercel.app/api/pre-order')
            const count = await fetch('https://clinic-api-two.vercel.app/api/pre-order/count')

            const jsonCount = await count.json()
            const json = await response.json()

            if (response.ok) {
                setOrders(json)
                setTotalOrders(jsonCount.totalOrders)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            // Set loading to false once data is fetched
            setLoading(false);
        }
        };
        fetchProducts()
    }, [])

    const setStatus = async (orderId, newStatus) => {
        try {
          // Send a PATCH request to update the order status
        const response = await fetch(`https://clinic-api-two.vercel.app/api/pre-order/${orderId}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        });
    
        if (!response.ok) {
            throw new Error('Failed to update order status');
        }

        // If the request is successful, you can update the local state to reflect the changes immediately
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderId ? { ...order, status: newStatus } : order
            )
        );
            console.log('Order status updated successfully');
        } catch (error) {
            console.error('Error updating order status:', error.message);
        }
    }

    return (
        <main id='order' className=' container-fluid pb-3 '> 
            <section className='opaque-background rounded-2 container px-3 py-4 d-flex flex-column gap-4'> 
                <h6 className='m-0 fw-bold text-warning '>Pre-Order List</h6>
                <div className='d-flex flex-column'>
                    <h4 className='text-light'>Pre-Order Management</h4>
                    <div className='d-flex justify-content-between gap-3 border-bottom border-warning border-5 py-4 mb-4'>
                        <div className='py-4 w-25 px-5 text-light rounded-3 d-flex flex-column ' style={{backgroundColor: '#FFFFFF80'}}>
                            <h6>Total Pre-Orders</h6>
                            <span className='w-100 text-end fs-3 fw-bold'>{totalOrders || 0} orders</span>
                        </div>
                    </div>
                    <div id='accordionParent' className='rounded-3 p-3 text-center accordion' style={{backgroundColor: '#B2B2B280', fontSize: '12px'}}>
                        <div className='d-flex gap-3 rounded-3 p-3 px-4 pb-0'>
                            <div className='w-75 d-flex gap-2'>
                                <span className='w-100 fw-bold'>{'Order ID'}</span>
                                <span className='w-100 fw-bold'>{'Order Date'}</span>
                                <span className='w-100 fw-bold'>{'Price'}</span>
                                <span className='w-100 fw-bold'>{'Qty'}</span>
                                <span className='w-100 fw-bold'>{'Type'}</span>
                            </div>
                            <div className='w-25 d-flex gap-2'>
                                <span className='w-100 fw-bold'>{'Status'}</span>
                                <span className='w-100 fw-bold'>{'Action'}</span>
                            </div>
                        </div>
                        <div className='py-3 px-2 d-flex gap-3 flex-column overflow-y-scroll ' style={{height: '460px'}}>
                        {loading ? (
                            <div className='d-flex flex-column  gap-3'>
                                <Skeleton count={2} height={50} />
                                <Skeleton count={2} height={50} />
                                <Skeleton count={2} height={50} />
                                <Skeleton count={2} height={50} />
                                <Skeleton count={2} height={50} />
                                <Skeleton count={2} height={50} />
                            </div>
                        ) : (
                            <>
                            {orders && orders.length !== 0 ? (
                                orders.map((order) => (
                                    <div className='accordion-item rounded-3' key={order._id} style={{backgroundColor: '#D9D9D980'}}>
                                        <div className='accordion-header d-flex align-items-center'>
                                            <button style={{fontSize: '12px'}} className='btn d-flex gap-2 w-75 align-items-center ' type='button' data-bs-toggle='collapse' data-bs-target={`#collapse${order._id}`} aria-expanded="true" aria-controls={`collapse${order._id}`}>
                                                <span className='w-100 text-truncate'>{order._id}</span>
                                                <span className='w-100 text-truncate'>{order.createdAt && format(new Date(order.createdAt), 'MMM dd, yyyy')}</span>
                                                <span className='w-100 text-truncate'>Php {order.total_amount}.00</span>
                                                <span className='w-100 text-truncate'>{order.total_qty} pcs.</span>
                                                <span className='w-100 text-truncate'>{order.shipping}</span>
                                            </button>  
                                            <div className='w-25 d-flex'>
                                                <div className="dropdown d-flex justify-content-center align-items-center w-100">
                                                    <button className={`btn w-100 btn-sm dropdown-toggle text-light ${order.status === 'Approved' ? 'bg-success' : order.status === 'Pending' ? 'bg-secondary' : ''}`} type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize: '12px'}}>
                                                        {order.status} 
                                                    </button>
                                                    <ul className="dropdown-menu" >
                                                        {[ 'Pending', 'Approved'].map((status, index) => (
                                                            <li key={index}>
                                                                <p className='dropdown-item' onClick={() => setStatus(order._id, status)} style={{ cursor: 'pointer' }} >
                                                                    {status}
                                                                </p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <span className='w-100 text-truncate'>
                                                    <button className='btn'><IconPark path={'ic:outline-delete'} size={20}/></button>    
                                                </span>
                                            </div>              
                                        </div>
                                        <div id={`collapse${order._id}`} className='accordion-collapse collapse' data-bs-parent='#accordionParent'>
                                            <div className='accordion-body bg-light d-flex justify-content-start '>
                                                <div className='w-50 d-flex align-items-start flex-column'>
                                                    <h6>Items</h6>
                                                    <div className='d-flex flex-column w-100 align-items-start gap-2'>
                                                        <div className='d-flex align-items-center gap-2 text-center w-100' style={{color: '#ffffff60'}}>
                                                            {subHeaders.map((header, indx) => (
                                                                <span className='w-100 text-truncate text-dark' key={indx}>{header}</span>
                                                            ))}
                                                        </div>
                                                        {Array.isArray(order.item_list) &&
                                                        order.item_list.map((item, i) => (
                                                            <div className='d-flex align-items-center gap-2 text-center w-100 py-1' key={i}>
                                                                <span className='w-100 text-truncate'>{item.item_id}</span>
                                                                <span className='w-100 text-truncate'>{item.item_name}</span>
                                                                <span className='w-100 text-truncate'>{item.qty}</span>
                                                                <span className='w-100 text-truncate'>{item.unit_price}</span>
                                                                <span className='w-100 text-truncate'>{item.unit_price * item.qty}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className='d-flex flex-column align-items-start w-50'>
                                                    <h6>Customer Details</h6>
                                                    <div className='d-flex flex-column align-items-start gap-2'>
                                                        <span className='fw-bold'>Customer Name: <span className='fw-normal'>{order.user_name}</span></span>
                                                        <span className='fw-bold'>Phone: <span className='fw-normal'>{order.phone}</span></span>
                                                        <span className='fw-bold'>Address: <span className='fw-normal'>{order.address}</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h4 className='py-3'>No Items Added...</h4>
                            )}
                            </>
                        )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default PreOrder