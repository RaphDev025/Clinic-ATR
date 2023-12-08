import React, { useState, useEffect } from 'react';
import vector from 'assets/extra/camera.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { IconPark } from 'assets/SvgIcons';

const ContentMgmt = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    post_img: '',
    category: '',
    price: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://clinic-atr-server-inky.vercel.app/api/articles', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      alert('Article Not Uploaded');
      console.error('Error uploading article:', json);
      setFormData({
        title: '',
        description: '',
        post_img: '',
        category: '',
        price: '',
      });
    } else {
      alert('Article Uploaded');
      console.log('Article Uploaded:', json);
      setFormData({
        title: '',
        description: '',
        post_img: '',
        category: '',
        price: '',
      });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFormData((prevData) => ({
      ...prevData,
      post_img: base64,
    }));
  };

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://clinic-atr-server-inky.vercel.app/api/articles');
        const json = await response.json();

        if (response.ok) {
          setNews(json);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteItem = async (postId) => {
    try {
      await fetch(`https://clinic-atr-server-inky.vercel.app/api/articles/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setNews((prevOrders) => prevOrders.filter((item) => item._id !== postId));

      console.log('Item deleted successfully');
    } catch (error) {
      console.log('Error deleting item from the cart:', error);
    }
  };

  const [editService, setEditService] = useState(null);

  const handleEditService = (service) => {
    setEditService(service);
  };

  const handleUpdateService = async () => {
    // Implement the logic to update the service data
    // You can make an API call similar to the one used for creating a new article
    // Use the editService state to get the data to update
    // After updating, reset the editService state to null
    setEditService(null);
  };

  return (
    <main id='content' className='container-fluid pb-3'>
      <section className='opaque-background rounded-2 container px-3 py-4 d-flex flex-column mb-3 gap-4'>
        <h6 className='m-0 fw-bold text-warning'>Content</h6>
        <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
          <div className='d-flex justify-content-between'>
            <h4 className='text-light'>Create new Article</h4>
          </div>
          <div className='d-flex gap-3 align-items-end'>
            <div className='d-flex flex-column w-75'>
              <label htmlFor='post_img' className='p-4 w-100 rounded-5 bg-secondary'>
                <img alt={vector} width={'100%'} src={formData.post_img || vector} />
              </label>
              <input
                onChange={(e) => handleFileUpload(e)}
                type='file'
                label='Image'
                className='p-2 rounded-3'
                id='post_img'
                name='image-upload'
                accept='.jpeg, .png, .jpg'
              />
            </div>
            <div className='d-flex flex-column w-100'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                className='p-2 rounded-3'
                id='title'
                value={formData.title}
                placeholder='Title'
                onChange={handleChange}
                required
              />
            </div>
            <div className='d-flex flex-column w-100'>
              <label htmlFor='category'>Category</label>
              <select
                id='category'
                className='p-2 rounded-3'
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value='' disabled>
                  Select category
                </option>
                <option value='services'>Services</option>
                <option value='newsfeed'>Newsfeed</option>
              </select>
            </div>
            {formData.category === 'services' && (
              <div className='d-flex flex-column w-100'>
                <label htmlFor='price'>Price</label>
                <input
                  type='text'
                  className='p-2 rounded-3'
                  id='price'
                  value={formData.price}
                  placeholder='Price'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
          </div>
          <div>
            <textarea
              placeholder='Description'
              id='description'
              value={formData.description}
              onChange={handleChange}
              className='rounded-3 w-100 p-3'
              rows='10'
              style={{ resize: 'none' }}
            ></textarea>
          </div>
          <div className='d-flex justify-content-end'>
            <button className='btn btn-success px-3' type='submit'>
              Post
            </button>
          </div>
        </form>
      </section>
      {formData.category === 'services' && (
        <section className='opaque-background rounded-2 container px-3 py-4 d-flex flex-column gap-4'>
          <h6 className='m-0 fw-bold text-warning '>Services Data</h6>
          {loading ? (
            <div className='d-flex gap-3 p-5'>
              <Skeleton count={2} height={50} />
              <Skeleton count={2} height={50} />
              <Skeleton count={2} height={50} />
            </div>
          ) : (
            <>
              {news &&
                news
                  .filter((post) => post.category === 'services')
                  .map((service) => (
                    <div key={service._id}>
                      {editService === service ? (
                        <>
                          <label htmlFor={`edit-title-${service._id}`}>Title</label>
                          <input
                            type='text'
                            id={`edit-title-${service._id}`}
                            value={editService.title}
                            onChange={(e) => setEditService({ ...editService, title: e.target.value })}
                          />

                          <label htmlFor={`edit-description-${service._id}`}>Description</label>
                          <textarea
                            id={`edit-description-${service._id}`}
                            value={editService.description}
                            onChange={(e) => setEditService({ ...editService, description: e.target.value })}
                          />

                          <label htmlFor={`edit-price-${service._id}`}>Price</label>
                          <input
                            type='text'
                            id={`edit-price-${service._id}`}
                            value={editService.price}
                            onChange={(e) => setEditService({ ...editService, price: e.target.value })}
                          />

                          <button onClick={handleUpdateService}>Update</button>
                        </>
                      ) : (
                        <>
                          <p>Title: {service.title}</p>
                          <p>Description: {service.description}</p>
                          <p>Price: {service.price}</p>
                          <button onClick={() => handleEditService(service)}>Edit</button>
                          <button onClick={() => handleDeleteItem(service._id)}>Delete</button>
                        </>
                      )}
                    </div>
                  ))}
            </>
          )}
        </section>
      )}
      {formData.category === 'newsfeed' && (
        <section className='opaque-background rounded-2 container px-3 py-4 d-flex flex-column gap-4'>
          <h6 className='m-0 fw-bold text-warning '>Your Posts</h6>
          {loading ? (
            <div className='d-flex gap-3 p-5'>
              <Skeleton count={2} height={50} />
              <Skeleton count={2} height={50} />
              <Skeleton count={2} height={50} />
            </div>
          ) : (
            <>
              {news && news.map((post) => (
                <article key={post._id} className='p-4 rounded-3 w-100 d-flex gap-4 self-container' style={{backgroundColor: 'var(--white)'}}>
                    <div className='text-center d-flex align-items-center bg-success rounded-3'>
                        <img src={post.post_img} className=' py-4 px-2' width={'200px'} height={'200px'} alt='content_photo'/>
                    </div>
                    <div className='my-4 w-100 border-top border-bottom border-2 border-success'>
                        <h3 className='text-start py-4'><strong>{post.title}</strong></h3>
                        <p className='mt-3 py-4 pt-0 px-3 text-wrap'>{post.description}</p>
                    </div>
                    
                    <button className='btn btn-danger h-25' type='button'  onClick={() => handleDeleteItem(post._id)} > <IconPark path={'ic:outline-delete'} size={20}/></button>  
                </article>
            ))}
            </>
          )}
        </section>
      )}
    </main>
  );
};

export default ContentMgmt;
