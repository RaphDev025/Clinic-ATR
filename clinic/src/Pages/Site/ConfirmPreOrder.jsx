import React, { useState, useEffect } from 'react';
import { GradientHeader } from 'Components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { IconPark } from 'assets/SvgIcons'

const ConfirmPreOrder = () => {
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState(null)

    // Fetching Data from Database for Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const json = await response.json();

                if (response.ok) {
                    setProducts(json);
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            } finally {
                // Set loading to false once data is fetched
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Function to map product data to cart items
    const getCartItemWithProductInfo = (cartItem) => {
        // Check if products is not null before using find
        const product = products && products.find((product) => product._id === cartItem.item_id);
        return { ...cartItem, product };
    };

    const cartItemsWithProductInfo = cart?.map(getCartItemWithProductInfo)

    return (
        <main className='container-fluid bg-main d-flex pt-2 p-0 m-0 vh-100'>
            <section className='container-fluid p-3 mt-5 overflow-y-auto'>
                <GradientHeader title={'My Cart'} />
                <div className='p-3 container d-flex flex-column'>
                    <div className='py-3 pe-0 px-0 d-flex gap-3 flex-column rounded-3 overflow-y-scroll'>
                        {loading ? (
                            <Skeleton count={5} height={50} />
                        ) : (
                        cartItemsWithProductInfo?.map((item) => (
                            <div className='rounded-2 p-3 align-items-center border border-1 d-flex w-100' style={{fontSize: '12px'}} key={item._id}>
                                <div className='w-100 d-flex gap-3 align-items-center'>
                                    <img src={item.product?.product_img} width={'30%'} alt={item.product?.item_name} />
                                </div>
                                <diy>
                                    <span className='m-0 text-center'>{item.product?.item_name}</span>

                                    <span className='m-0 w-100 text-center'>Php {item.product?.unit_price}.00</span>
                                    <span className='m-0 w-100 text-center'>{item.qty}pcs</span>
                                    <span className='m-0 w-100 text-center text-success'>{item.shipping} <IconPark size={24} path={item.shipping === 'For Delivery' ? 'tabler:truck-delivery' : 'icon-park-outline:delivery'} /></span>
                                
                                    <span className='m-0 w-100 text-center'>Php {item.total_amount}.00</span>
                                </diy>
                                </div>
                        ))
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ConfirmPreOrder