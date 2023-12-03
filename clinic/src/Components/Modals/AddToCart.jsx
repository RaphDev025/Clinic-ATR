import React, { useState, useEffect } from 'react';
import { IconPark } from 'assets/SvgIcons';
import { useCart } from 'Context/CartContext';
import { useAuth } from 'Context/AuthContext';

const AddToCart = () => {
  const { itemData } = useCart();
  const { user } = useAuth();

  const [item, setItem] = useState({
    item_id: '',
    item_name: '',
    qty: 1,
    unit_price: 1,
    total_amount: 0,
    shipping: '',
    courier: '',
    user_name: '',
    phone: '',
    address: '',
    user_id: '',
  });


  useEffect(() => {
    // Update item_name, item_id, unit_price when itemData changes
    setItem((prevItem) => ({
      ...prevItem,
      item_name: itemData.item_name,
      item_id: itemData._id,
      unit_price: itemData.unit_price,
    }));

    // Update total_amount whenever qty or unit_price changes
    setItem((prevItem) => ({
      ...prevItem,
      total_amount: prevItem.qty * prevItem.unit_price,
    }));
  }, [itemData, item.qty, item.unit_price]);

  // UseEffect to update user details in the item state
  useEffect(() => {
    if (user) {
      setItem((prevItem) => ({
        ...prevItem,
        user_name: user.first_name, // Assuming the user object has a 'first_name' property
        phone: user.phone,
        user_id: user._id,
        address: user.address,
      }));
    }
  }, [user]);

  const handleDecrement = () => {
    setItem((prevItem) => ({ ...prevItem, qty: Math.max(1, prevItem.qty - 1) }));
  };

  const handleIncrement = () => {
    setItem((prevItem) => ({ ...prevItem, qty: prevItem.qty + 1 }));
  };

  const handleQuantityChange = (event) => {
    // Ensure the quantity is a positive integer
    const newQuantity = Math.max(1, parseInt(event.target.value, 10) || 1);
    setItem((prevItem) => ({ ...prevItem, qty: newQuantity }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Add your form submission logic here using itemWithUserDetails
    const response = await fetch('https://clinic-api-two.vercel.app/api/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      alert('Cart Item Not Uploaded');
    } else {
      alert('Cart Item Uploaded');
    }

    // Reset the item state after submission
    setItem({
      user_name: '',
      phone: '',
      address: '',
      user_id: '',
      item_name: '',
      qty: 1,
      unit_price: 1,
      total_amount: 0,
      shipping: '',
      courier: '',
    });
  };

  return (
    <div className={`modal fade`} id="addItem" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden={true}>
      <div className="modal-dialog">
        <div className="modal-content" style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.175)' }}>
          <div className="modal-header">
            <h1 className="modal-title fs-6 text-success" id="staticBackdropLabel">
              Add To Cart
            </h1>
            <button type="button" onClick={() => setItem({ ...item, qty: 1, shipping: 'For Delivery' })} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-2 w-100 text-success">
              <div className="d-flex gap-2">
                <div className="h-25">{itemData.product_img && <img alt="product" src={itemData.product_img} width={'250px'} height={'250px'} />}</div>
                <div className="d-flex flex-column gap-3">
                  <h4 className="fw-bold">{itemData.item_name}</h4>
                  <div className="d-flex flex-column">
                    <h6 className="fw-bold">Quantity</h6>
                    <div className="d-flex">
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleDecrement}>
                        <IconPark path={'ic:round-minus'} />
                      </button>
                      <input type="number" onChange={handleQuantityChange} id="qty" min={1} value={item.qty} className="text-center bg-light rounded-3 w-25" />
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleIncrement}>
                        <IconPark path={'ic:round-plus'} />
                      </button>
                    </div>
                    {itemData.qty === 0 ? <pre className="text-danger fst-italic m-0">*Out of Stock</pre> : ''}
                  </div>
                  <div className="d-flex gap-2 w-100">
                    <button type="button" onClick={() => setItem({ ...item, shipping: 'For Pick-up', courier: 'None' })} className={`w-100 btn ${item.shipping === 'For Pick-up' ? 'btn-success' : 'btn-outline-success'} btn-sm`}>
                      For Pick-up
                    </button>
                    <button type="button" onClick={() => setItem({ ...item, shipping: 'For Delivery' })} className={`w-100 btn ${item.shipping === 'For Delivery' ? 'btn-success' : 'btn-outline-success'} btn-sm`}>
                      For Delivery
                    </button>
                  </div>
                  {item.shipping === 'For Delivery' ? (
                    <>
                      <div className="d-flex flex-column gap-2 w-100">
                        <h6>Select Delivery Option:</h6>
                        <button type="button" onClick={() => setItem({ ...item, courier: 'Toktok' })} className={`w-100 btn ${item.courier === 'Toktok' ? 'btn-success' : 'btn-outline-success'} btn-sm`}>
                          Toktok
                        </button>
                        <button type="button" onClick={() => setItem({ ...item, courier: 'Lalamove' })} className={`w-100 btn ${item.courier === 'Lalamove' ? 'btn-success' : 'btn-outline-success'} btn-sm`}>
                          Lalamove
                        </button>
                        <button type="button" onClick={() => setItem({ ...item, courier: 'Angkas' })} className={`w-100 btn ${item.courier === 'Angkas' ? 'btn-success' : 'btn-outline-success'} btn-sm`}>
                          Angkas
                        </button>
                        <button type="button" onClick={() => setItem({ ...item, courier: 'Grab' })} className={`w-100 btn ${item.courier === 'Grab' ? 'btn-success' : 'btn-outline-success'} btn-sm`}>
                          Grab
                        </button>
                      </div>
                    </>
                  ) : item.shipping === 'For Pick-up' ? (
                    <>
                      <p className="text-danger fst-italic" style={{ fontSize: '12px' }}>
                        *Orders labeled 'For Pick-Up' must be claimed within 2 days to avoid cancellation.
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="py-2 px-0 d-flex flex-column modal-footer gap-2">
                <button type="submit" data-bs-dismiss="modal" className={`w-100 btn ${itemData.qty === 0 ? 'btn-outline-secondary disabled' : 'btn-outline-success'} py-2 px-3 text-uppercase `}>
                  Add to Cart <IconPark path={'iconoir:add-to-cart'} size={18} />
                </button>
                <button type="submit" data-bs-dismiss="modal" className={`w-100 btn ${itemData.qty !== 0 ? 'btn-outline-secondary disabled' : 'btn-outline-success'} py-2 px-3 text-uppercase `}>
                  Pre-Order <IconPark path={'ph:basket-bold'} size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
