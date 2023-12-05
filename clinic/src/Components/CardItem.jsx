import React from 'react'
import { IconPark } from 'assets/SvgIcons'
import { useCart } from 'Context/CartContext'
import { useNavigate } from 'react-router-dom'

const CardItem = ({data}) => {
    
    const navigate = useNavigate();

    const { addToCart } = useCart()
    
    const handleSelected = () => {
        addToCart(data)
        navigate('/view-item')
    }

    return ( 
        <div key={data._id} className='product-card item-card rounded-3 border border-success border-3' style={{backgroundColor: '#00FF3812'}}>
            <img src={data.product_img } alt='prod' className='product-img' />
            <div className='card-body item-details rounded-2 detail bg-light text-light'>
                <div className='pad-lt'>
                    <h5 className='card-title  text-dark m-0 text-wrap w-100'>{data.item_name}</h5>
                    <p className='card-text text-dark fs-6'>P {data.unit_price}.00</p>
                </div>
                <div className='d-flex gap-3 pad-rt'>
                    <button style={{fontSize: '12px'}} className='rounded-2 btn btn-sm btn-outline-success' onClick={handleSelected} >
                    <IconPark path={'iconoir:xray-view'} size={32} /> View More</button>
                    <button style={{fontSize: '12px'}} className='rounded-2 btn btn-sm btn-outline-success' onClick={() => addToCart(data)} data-bs-target="#addItem" data-bs-toggle="modal">
                    <IconPark path={'mdi:cart-plus'} size={32} /> Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default CardItem