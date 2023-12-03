import React, { useState } from 'react'
import { GradientHeader, SideBar, Testimonials } from 'Components'
import avatar from 'assets/extra/Vector.png'

const TestimonyPage = () => {
    const [select, setSelected] = useState(true)

    const handleItemClick = () => {
        setSelected(!select)
    }

    const sampleData = [
        {
          id: 1,
          name: 'Sample Name 1',
          review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          icon: <img src={avatar} alt='avatar' />
        },
        {
          id: 2,
          name: 'Sample Name 2',
          review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          icon: <img src={avatar} alt='avatar' />
        },
        {
          id: 3,
          name: 'Sample Name 3',
          review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          icon: <img src={avatar} alt='avatar' />
        },
        {
          id: 4,
          name: 'Sample Name 4',
          review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          icon: <img src={avatar} alt='avatar' />
        }
    ]

    return (
        <main className='container-fluid d-flex p-0 m-0 vh-100'>
            <SideBar props={'pt-5 text-dark user-aside h-100'}>
                <ul className='navbar-nav gap-3 pt-5'>
                    <li className={`nav-item p-2 px-4 ${select ? 'active' : ''}`} onClick={handleItemClick}>Testimonials</li>
                    <li className={`nav-item p-2 px-4 ${!select ? 'active' : ''}`} onClick={handleItemClick}>Feedbacks</li>
                </ul>
            </SideBar>
            {select ? <section className='container-fluid p-3 mt-5 overflow-y-auto'>
                <GradientHeader title={'Testimonials'} />
                <div className='container mt-3'>
                    <div className='d-flex justify-content-center'>
                        <h2 className='text-center col-6 mb-5'>Don't just take our word for it - See what our customers have to say</h2>
                    </div>
                    <div className='border-top border-bottom border-success border-3 py-5 px-3'>
                        <Testimonials contents={sampleData} />
                    </div>
                </div>
            </section> 
            :
            <section className='container-fluid p-3 mt-5 overflow-y-auto'>
                <GradientHeader title={'Feedbacks'} />
                <div className='container mt-3'>
                    <div className='d-flex justify-content-center'>
                        <h2 className='text-center col-6 mb-5 '><strong>We want to hear from you. Share your experience with us!</strong></h2>
                    </div>
                    <div className='border-top border-bottom border-success border-3 py-5 px-3' >
                        <form className='d-flex flex-column gap-3'>
                            <div className='d-flex gap-5'>
                                <div className='d-flex flex-column w-100'>
                                    <label htmlFor='fName' >First Name</label>
                                    <input type='text' className='p-2 rounded-3' id='fName' placeholder='First Name' required />                        
                                </div>
                                <div className='d-flex flex-column w-100'>
                                    <label htmlFor='lName' >Last Name</label>
                                    <input type='text' className='p-2 rounded-3' id='lName' placeholder='Last Name' required />                        
                                </div>
                            </div>
                            <div>
                                <textarea placeholder='Write your feedbacks for our products/services here' className='rounded-3 w-100 p-3' rows='10' style={{resize: 'none'}}></textarea>
                            </div>
                            <div className='ms-auto'>
                                <button className='btn btn-success rounded-3 px-3 text-uppercase'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            }
        </main>
    )
}

export default TestimonyPage