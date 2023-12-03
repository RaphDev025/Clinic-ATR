import React, { useState, useEffect } from 'react'
import { BsClockFill } from 'react-icons/bs'
import { BiShare } from 'react-icons/bi'
import { GradientHeader } from 'Components'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { format } from 'date-fns';
import { FacebookShareButton } from "react-share";

const NewsFeedPage = () => {
    const [news, setNews] = useState(null)
    const [loading, setLoading] = useState(true)
    
    // Fetching Data from Database
    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const response = await fetch('https://clinic-api-two.vercel.app/api/articles');
            const json = await response.json();
    
            if (response.ok) {
                setNews(json)
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
        <main className='container-fluid pt-5 mt-5 p-0 m-0 overflow-y-auto'>
            <header>
                <GradientHeader title={'Announcement'} />
            </header>
            <section className='d-flex flex-column align-items-center container-fluid px-5 gap-4 pb-5'>
            {loading ? (
                <div className='d-flex gap-3 p-5'>
                    <Skeleton count={2} height={50} />
                    <Skeleton count={2} height={50} />
                    <Skeleton count={2} height={50} />
                </div>
            ) : (
                <>
                {news && news.map((post) => (
                    <article key={post._id} className='p-4 rounded-3 w-50' style={{backgroundColor: 'var(--white)'}}>
                        <div className='text-center bg-success rounded-3'>
                            <img src={post.post_img} className=' py-4 px-2' width={'50%'} height={'50%'} alt='content_photo'/>
                        </div>
                        <div className='my-4 border-top border-bottom border-2 border-success'>
                            <h3 className='text-start py-4'><strong>{post.title}</strong></h3>
                            <span style={{fontSize: '12px'}}><BsClockFill className='text-success me-2'/> {post.createdAt && format(new Date(post.createdAt), 'E, MMMM do yyyy, h:mm:ss a')}</span>
                            <p className='mt-3 py-4 pt-0 px-3 text-wrap'>{post.description}</p>
                        </div>
                        <div className='d-flex justify-content-end container'>
                            <FacebookShareButton url={`https://atr-clinic-client.vercel.app/newsfeed`} quote={'Check what`s Latest'} hashtag={'#ATRSkinCareClinic'}>
                                <button className='border-light px-4 btn btn-success'>
                                    <BiShare className='flip' /> Share on Facebook
                                </button>
                            </FacebookShareButton>
                        </div>
                    </article>
                ))}
                </>
            )}
            </section>
        </main>
    )
}

export default NewsFeedPage