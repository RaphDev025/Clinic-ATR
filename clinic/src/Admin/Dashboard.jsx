import React, { useEffect, useState } from 'react'
import { IconPark } from 'assets/SvgIcons'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Dashboard = () => {
    const [products, setProducts] = useState(null)
    const [total, setTotal] = useState(null)
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState(null)
    const [totalSales, setTotalSales] = useState(null);
    const [completed, setComplete] = useState(null);

    // Fetching Data from Database
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await fetch('https://clinic-api-two.vercel.app/api/products/top-products');
            const responseTotal  = await fetch('https://clinic-api-two.vercel.app/api/ordering/get-total');
            const resTotalUsers  = await fetch('https://clinic-api-two.vercel.app/api/users/count');
            const responseTotalSales = await fetch('https://clinic-api-two.vercel.app/api/ordering/total-sales');
            const resCompleted = await fetch('https://clinic-api-two.vercel.app/api/ordering/complete');
            
            const json = await response.json(); 
            const totalData  = await responseTotal.json()
            const totalUser  = await resTotalUsers.json()
            const totalSalesData = await responseTotalSales.json();
            const completed = await resCompleted.json();

            if (response.ok) {
                setProducts(json)
            }
            if (resCompleted.ok) {
                setComplete(completed.totalComplete)
            }
            if (responseTotal.ok) {
                setTotal(totalData.totalAmount);
            }
            if (resTotalUsers.ok) {
                setUsers(totalUser.totalUsers);
            }
            if (responseTotalSales.ok) {
                setTotalSales(totalSalesData.totalSales);
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
        <main id='dash' className=' container-fluid '>
            <section className='opaque-background rounded-2 container px-3 py-4 d-flex flex-column gap-4 '> 
                <h6 className='m-0 fw-bold text-warning '>Dashboard</h6>
                <div className=' rounded-3 text-light p-3 px-5 d-flex flex-column gap-3' style={{ backgroundColor: '#FFFFFF80'}}>
                    Total Revenue
                    <span className='fw-bold fs-4'>Php {total || 0}.00</span>
                </div>
                <section className='d-flex justify-content-center align-items-center gap-5 '>
                    <div className='rounded-2 text-light p-4 gap-3 d-flex' style={{ backgroundColor: '#FFFFFF80'}}>
                        <IconPark path={'ci:users'} size={'60px'} />
                        <div className='d-flex flex-column gap-3'>
                            Total Customers
                            <span>{users || 0} users</span>
                        </div>
                    </div>
                    <div className='rounded-2 text-light p-4 gap-3 d-flex' style={{ backgroundColor: '#FFFFFF80'}}>
                        <IconPark path={'material-symbols:orders-outline'} size={'60px'} />
                        <div className='d-flex flex-column gap-3'>
                            Orders Completed
                            <span>{completed || 0} orders</span>
                        </div>
                    </div>
                    <div className='rounded-2 text-light p-4 gap-3 d-flex' style={{ backgroundColor: '#FFFFFF80'}}>
                        <IconPark path={'material-symbols:shopping-cart-outline'} size={'60px'} />
                        <div className='d-flex flex-column gap-3'>
                            Total Sales
                            <span>{totalSales || 0} items</span>
                        </div>
                    </div>
                </section>
                <section className='d-flex flex-column py-5 px-4'>
                    <h6 className='text-light fw-bold fs-4'>Top Products</h6> 
                    <div className='d-flex justify-content-center gap-5 align-items-center w-100'>
                        {loading ? (
                            // Display loading skeleton while data is being fetched
                            <div className='d-flex gap-3 p-5'>
                                <Skeleton count={2} height={50} />
                                <Skeleton count={2} height={50} />
                                <Skeleton count={2} height={50} />
                            </div>
                            ) : (
                            // Display actual data once fetched
                            <>
                            {products && products.map((product) => (
                                <div key={product._id} className='d-flex flex-column justify-content-around align-items-center p-4 rounded-3' style={{height: '400px', backgroundColor: '#FFFFFF80'}}>
                                    <img className='text-center mb-3' alt={'product'} src={product.product_img} width={'60%'} height={'50%'} />
                                    <div className='d-flex flex-column justify-content-start'>
                                        <strong>Item Name: {product.item_name}</strong>
                                        <span>Products Sold: {product.soldCount} pcs.</span>
                                        <span>Total Sales Made: Php {product.soldCount * product.unit_price}.00</span>
                                    </div>
                                </div>
                            ))}
                            </>
                        )}
                    </div>
                </section>
            </section>
        </main>
    )
}

export default Dashboard