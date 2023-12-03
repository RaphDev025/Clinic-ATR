import React, { useState, useEffect } from 'react'
import { GradientHeader } from 'Components'
import { useNavigate  } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { IconPark } from 'assets/SvgIcons';

const Featured = () => {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Fetching Data from Database
  useEffect(() => { 
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://clinic-api-two.vercel.app/api/products/top-products');
        const json = await response.json();

        if (response.ok) {
          setProducts(json);
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
  
  const handleSubmit = () => {
    navigate('/featured');
  }

  return (
    <section className='p-5 gap-5 container'>
      <GradientHeader title={'Best Sellers'} />
      <div className='p-3 gap-2 container d-flex justify-content-center align-items-center'>
        {loading ? (
          // Display loading skeleton while data is being fetched
          <div className='d-flex gap-3 p-5'>
            <Skeleton count={2} height={50} />
            <Skeleton count={2} height={50} />
            <Skeleton count={2} height={50} />
          </div>
        ) : (
          // Display actual data once fetched
          products && products.map((product) => (
            <div key={product._id} className='m-3 d-flex flex-column align-items-center item-card rounded-3 border border-success border-3' style={{backgroundColor: '#00FF3812', height: '280px'}}>
                <img src={product.product_img } alt='prod' className='p-3 h-75' height='100%' />
                <div className='card-body w-100 h-25 rounded-2 p-3 detail bg-light text-light gap-3 d-flex justify-content-between align-items-center'>
                    <div>
                        <h5 className='card-title  text-dark m-0 text-wrap w-100'>{product.item_name}</h5>
                        <p className='card-text text-dark fs-6'>P {product.unit_price}.00</p>
                    </div>
                    <div>
                        <button style={{fontSize: '12px'}} className='rounded-2 btn btn-sm btn-outline-success' onClick={() => navigate('/featured')}>
                        <IconPark path={'mdi:cart-plus'} size={32} /> View Item</button>
                    </div>
                </div>
            </div>
          ))
        )}
      </div>
      <div className='d-flex justify-content-center '>
        <button className='orderBtn px-3 py-2 text-uppercase text-light' onClick={handleSubmit} >View All Products</button>
      </div>
    </section>
  )
}

export default Featured