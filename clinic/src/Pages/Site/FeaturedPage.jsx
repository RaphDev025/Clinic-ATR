  import React, { useState, useEffect } from 'react'
  import { GradientHeader } from 'Components'
  import Skeleton from 'react-loading-skeleton'
  import 'react-loading-skeleton/dist/skeleton.css'
  import { AddToCart, CardItem } from 'Components'

  const FeaturedPage = () => {
      const [products, setProducts] = useState(null)
      const [loading, setLoading] = useState(true)
      const [searchQuery, setSearchQuery] = useState('')

      // Fetching Data from Database
      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch('https://clinic-api-two.vercel.app/api/products');
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

      // Filter products based on search query
      const filteredProducts = (products ?? []).filter(
        (product) =>
          product.item_name.toLowerCase().includes(searchQuery.toLowerCase())
      )

      return (
          <main className='container-fluid bg-main d-flex pt-2 p-0 m-0 vh-100'>
              <section className='container-fluid p-3 mt-5 overflow-y-auto' >
                <GradientHeader title={'Our Products'} />
                <div className='p-3 gap-3 d-flex flex-wrap justify-content-center container '>
                  <div className='w-100 px-5'>
                    <div className='d-flex flex-column w-100'>
                      <label htmlFor='search' className='w-50'>Search for a Product</label>
                      <input type='text' className='p-2 rounded-3' id='search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search for a Product' required />                        
                    </div>
                  </div>
                  {loading ? (
                    // Display loading skeleton while data is being fetched
                    <>
                      <Skeleton count={2} height={50} />
                      <Skeleton count={2} height={50} />
                      <Skeleton count={2} height={50} />
                      <Skeleton count={2} height={50} />
                    </>
                  ) : (
                    // Display actual data once fetched
                    filteredProducts.map((product) => (
                      <CardItem data={product} key={product._id} height={'400px'} />
                    ))
                  )}  
                </div>
              </section>
            <AddToCart />
          </main>
      )
  }

  export default FeaturedPage