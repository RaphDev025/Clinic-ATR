import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CustomerMgmt = () => {
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0)
    const [newUsers, setNewUsers] = useState(0)

    // Fetching Data from Database
    useEffect(() => {
        const fetchCount = async () => {
        try {
            const response = await fetch('https://clinic-api-two.vercel.app/api/users/count');
            const response2 = await fetch('https://clinic-api-two.vercel.app/api/users/new-count');
            const json = await response.json()
            const json2 = await response2.json()

            if (response.ok && response2.ok) {
                setCount(json.totalUsers)
                setNewUsers(json2.totalNewUsers)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            // Set loading to false once data is fetched
            setLoading(false);
        }
        };
        fetchCount()
    }, [])

    // Fetching Data from Database
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await fetch('https://clinic-api-two.vercel.app/api/users');
            const json = await response.json();

            if (response.ok) {
            setUsers(json);
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

    return (
        <main id='customer' className=' container-fluid'> 
            <section className='opaque-background rounded-2 container px-3 py-4 d-flex flex-column gap-4 '> 
                <h6 className='m-0 fw-bold text-warning '>Customers</h6>
                <div className='d-flex flex-column'>
                    <h4 className='text-light'>User Management</h4>
                    <div className='d-flex gap-4 border-bottom border-warning border-5 py-4 mb-4'>
                        <div className='py-4 col-3 px-5 text-light rounded-3 d-flex flex-column ' style={{backgroundColor: '#FFFFFF80'}}>
                            <h6>Total Customers</h6>
                            <span className='w-100 text-end fs-3 fw-bold'>{count}</span>
                        </div>
                        <div className='py-4 col-3 px-5 text-light rounded-3 d-flex flex-column ' style={{backgroundColor: '#FFFFFF80'}}>
                            <h6>New Customers</h6>
                            <span className='w-100 text-end fs-3 fw-bold'>{newUsers}</span>
                        </div>
                    </div>
                    <div className='py-3 px-2 d-flex gap-3 text-center flex-column rounded-3 overflow-y-scroll ' style={{backgroundColor: '#B2B2B280', height: '460px', fontSize: '12px'}}>
                        <div className='d-flex gap-3 rounded-3 p-3 pb-0'>
                            <span className='w-100 fw-bold'>{'Customer Name'}</span>
                            <span className='w-100 fw-bold'>{'User Name'}</span>
                            <span className='w-100 fw-bold'>{'Gender'}</span>
                            <span className='w-100 fw-bold'>{'Address'}</span>
                            <span className='w-100 fw-bold'>{'Contact'}</span>
                        </div>
                    {loading ? (
                        <div className='d-flex flex-column  gap-3'>
                            <Skeleton count={2} height={50} />
                            <Skeleton count={2} height={50} />
                            <Skeleton count={2} height={50} />
                        </div>
                    ) : (
                        <>
                        {users && users.map((user) => (
                            <div className='d-flex gap-3 px-3 py-2 rounded-3' key={user._id} style={{backgroundColor: '#D9D9D980'}}>
                                <span className='w-100'>{user.first_name} {user.last_name}</span>
                                <span className='w-100'>{user.user_name}</span>
                                <span className='w-100'>{user.gender}</span>
                                <span className='w-100'>{user.address}</span>
                                <span className='w-100'>{user.phone}</span>
                            </div>
                        ))}
                        </>
                    )}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default CustomerMgmt