import React, { useState, useEffect } from 'react';
import { GradientHeader } from 'Components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { IconPark } from 'assets/SvgIcons'
import { useItems } from 'Context/ItemsContext'
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'Context/AuthContext';

const UserCart = () => {
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState(null)
    const [selectedItems, setSelectedItems] = useState([])
    const { addItems, resetItems } = useItems()
    const navigate = useNavigate();
    const { user } = useAuth();
    
    useEffect(() => {
        if (!user) {
            navigate('/auth/user-login');
        }
    }, [user, navigate]);

    // Function to handle checkout
    const handleCheckout = () => {
        resetItems()
        // Filter selected items from cartItemsWithProductInfo
        const selectedItemsData = cartItemsWithProductInfo.filter((item) => selectedItems.includes(item._id))
        addItems(selectedItemsData)
        console.log(selectedItemsData)
        // // Navigate to the checkout page
        navigate('/confirmation/order')
    };

    // Fetching Data from Database for Cart
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('https://clinic-api-two.vercel.app/api/cart');
                const json = await response.json();
                if (response.ok) {
                    setCart(json)
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };
        fetchCart();
    }, []);

    // Fetching Data from Database for Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://clinic-api-two.vercel.app/api/products');
                const json = await response.json();
                if (response.ok) {
                    setProducts(json)
                }
            } catch (error) {
                console.error('Error fetching product data:', error)
            } finally {
                // Set loading to false once data is fetched
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])
    // Function to map product data to cart items
    const getCartItemWithProductInfo = (cartItem) => {
        // Check if products is not null before using find
        const product = products && products.find((product) => product._id === cartItem.item_id)
        return { ...cartItem, product }
    }
    const cartItemsWithProductInfo = cart?.map(getCartItemWithProductInfo)
    // Function to handle checkbox change
    const handleCheckboxChange = (itemId) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(itemId)) {
                // If item is already selected, remove it
                return prevSelectedItems.filter((id) => id !== itemId);
            } else {
                // If item is not selected, add it
                return [...prevSelectedItems, itemId];
            }
        })
    }
    // Function to calculate total quantity of selected items
    const calculateTotalQuantity = () => {
        return selectedItems.reduce((total, itemId) => {
        const selectedItem = cartItemsWithProductInfo.find((item) => item._id === itemId);
        return total + selectedItem.qty;
        }, 0)
    }
    // Function to calculate total amount of selected items
    const calculateTotalAmount = () => {
        return selectedItems.reduce((total, itemId) => {
            const selectedItem = cartItemsWithProductInfo.find(
                (item) => item._id === itemId
            );
            return total + selectedItem.product.unit_price * selectedItem.qty;
        }, 0);
    }
    // Function to handle decrease button
    const handleDecrease = (itemId) => {
        const selectedItem = cartItemsWithProductInfo.find(
            (item) => item._id === itemId
        );
        if (selectedItem.qty > 1) {
            handleQuantityChange(itemId, selectedItem.qty - 1);
        }
    }
    // Function to handle increase button
    const handleIncrease = (itemId) => {
        const selectedItem = cartItemsWithProductInfo.find(
            (item) => item._id === itemId
        );
        handleQuantityChange(itemId, selectedItem.qty + 1);
    }
     // Function to handle quantity change
    const handleQuantityChange = (itemId, newQuantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === itemId ? { ...item, qty: newQuantity } : item
            )
        )
    }

    // Function to handle delete button
    const handleDeleteItem = async (itemId) => {
        // Make an API call to delete the item from the cart in the database
        try {
            await fetch(`https://clinic-api-two.vercel.app/api/cart/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // If the API call is successful, update the state
            setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
            setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((id) => id !== itemId));
        } catch (error) {
            console.error('Error deleting item from the cart:', error);
        }
    };
    
    
    return (
        <main className='container-fluid bg-main d-flex pt-2 p-0 m-0 vh-100' >
            <section className='container-fluid p-3 mt-5 overflow-y-auto' style={{marginBottom: '60px'}}>
                <GradientHeader title={'My Cart'} />
                <div className='p-3 container d-flex flex-column'>
                    <div className='d-flex gap-2 bg-light border border-1 p-2 px-5 rounded-2' style={{ fontSize: '12px' }}>
                        <span className='w-100 m-0 text-center fw-bold'>Product</span>
                        <span className='w-100 m-0 text-center fw-bold ps-5'>Unit Price</span>
                        <span className='w-100 m-0 text-center fw-bold pe-4'>Quantity</span>
                        <span className='w-100 m-0 text-start fw-bold pe-4'>Sub-Total</span>
                        <span className='w-100 m-0 text-center fw-bold pe-5'>Courier</span>
                        <span className='w-100 m-0 text-center fw-bold pe-5'>Shipping</span>
                    </div>
                    <div className='py-3 pe-0 px-0 d-flex gap-3 flex-column rounded-3 overflow-y-scroll' style={{height: '500px'}}>
                        {loading ? (
                            <Skeleton count={5} height={50} />
                        ) : (
                            cartItemsWithProductInfo && cartItemsWithProductInfo.length > 0 ? (
                                cartItemsWithProductInfo?.map((item) => (
                                    <div className='rounded-2 p-3 px-2 align-items-center border border-1 d-flex w-100' style={{fontSize: '12px'}} key={item._id}>
                                        <input type='checkbox' checked={selectedItems.includes(item._id)} onChange={() => handleCheckboxChange(item._id)} />
                                        
                                        <div className='w-100 d-flex gap-3 align-items-center'>
                                            <img src={item.product?.product_img} width={'60px'} alt={item.product?.item_name} />
                                            <span className='m-0 text-center'>{item.product?.item_name}</span>
                                        </div>
                                        
                                        <span className='m-0 w-100 text-center'>Php {item.product?.unit_price}.00</span>
                                        <div className='d-flex'>
                                            <button type='button' className='btn btn-sm btn-outline-secondary' onClick={() => handleDecrease(item._id)} ><IconPark path={'ic:round-minus'} /></button>
                                            <input type='number' min={1} className='text-center bg-light rounded-3 p-1' style={{width: '50px'}} value={item.qty} onChange={(e) => handleQuantityChange(item._id, e.target.value)} />
                                            <button type='button' className='btn btn-sm btn-outline-secondary' onClick={() => handleIncrease(item._id)} ><IconPark path={'ic:round-plus'} /></button>
                                        </div>
                                        <span className='m-0 w-100 text-center'>Php {item.product?.unit_price * item.qty}.00</span>
                                        <span className='m-0 w-100 text-center'>{item.courier}</span>
                                        <span className='m-0 w-100 text-center text-success'>{item.shipping} <IconPark size={24} path={item.shipping === 'For Delivery' ? 'tabler:truck-delivery' : 'icon-park-outline:delivery'} /></span>
                                        <button type='button' className='btn btn-sm btn-outline-danger' onClick={() => handleDeleteItem(item._id)}>
                                            <IconPark path={'mdi:trash-can-outline'} size={23} />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center">
                                    <p>No items added</p>
                                </div>
                            )    
                        )}
                    </div>
                </div>
            </section>
            <div className='position-fixed bottom-0 container-fluid bg-secondary-subtle d-flex justify-content-end gap-3 align-items-center px-5 p-3'>
                <div className=''>
                    <span>Total ({calculateTotalQuantity()} product(s))</span>
                </div>
                <div className='d-flex gap-3 align-items-center'>
                    <span className='text-success'>Total Amount: Php {calculateTotalAmount()}.00</span>
                    <button disabled={selectedItems.length === 0} className='btn btn-success btn-lg' onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
        </main>
    );
};

export default UserCart;
