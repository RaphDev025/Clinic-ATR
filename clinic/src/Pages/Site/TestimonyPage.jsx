import React, { useState, useEffect } from 'react'
import { GradientHeader, Testimonials } from 'Components'
import avatar from 'assets/extra/Vector.png'
import { useAuth } from 'path-to-your/AuthContext'; // Update the path accordingly

const TestimonyPage = () => {
    const { user } = useAuth();
    const [feedback, setFeedback] = useState('');
    const [testimonials, setTestimonials] = useState(null);

    useEffect(() => {
        // Fetch testimonials from the database or your API endpoint
        // Replace 'your-api-endpoint-for-testimonials' with the actual endpoint
        fetch('your-api-endpoint-for-testimonials')
            .then(response => response.json())
            .then(data => {
                setTestimonials(data);
            })
            .catch(error => {
                console.error('Error fetching testimonials:', error);
            });
    }, []);

    const handleFeedbackSubmit = () => {
        if (!user) {
            // User is not logged in, handle accordingly (e.g., show a login modal)
            console.log('User is not logged in. Please log in to submit feedback.');
            return;
        }

        // User is logged in, send the post request with feedback data
        const postData = {
            userId: user.id, // Assuming user object has an 'id' property
            first_name: user.first_name, // Assuming user object has a 'first_name' property
            last_name: user.last_name, // Assuming user object has a 'last_name' property
            feedback: feedback,
        };

        // Your API endpoint for submitting feedback
        fetch('your-feedback-api-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then(response => {
                if (response.ok) {
                    // Handle success
                    console.log('Feedback submitted successfully!');
                    // Optionally, you can reset the feedback input
                    setFeedback('');
                } else {
                    // Handle error
                    console.error('Error submitting feedback:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error submitting feedback:', error);
            });
    };
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
        <main className='container-fluid d-flex flex-column p-0 m-0 vh-100'>
            <section className='container-fluid p-3 mt-5'>
                <GradientHeader title={'Testimonials'} />
                <div className='container mt-3'>
                    <div className='d-flex justify-content-center'>
                        <h2 className='header-testimony text-center'>Don't just take our word for it - See what our customers have to say</h2>
                    </div>
                    <div className='border-top border-bottom border-success border-3 py-5'>
                        <Testimonials contents={testimonials} />
                    </div>
                </div>
            </section> 
            
            <section className='container-fluid p-3 mt-5'>
                <GradientHeader title={'Feedbacks'} />
                <div className='container mt-3'>
                    <div className='d-flex justify-content-center'>
                        <h2 className='header-testimony text-center '><strong>We want to hear from you. Share your experience with us!</strong></h2>
                    </div>
                    <div className='border-top border-bottom border-success border-3 py-5' >
                        <form className='d-flex flex-column gap-3'>
                            <div className='d-flex gap-2 flex-wrap'>
                                <div className='d-flex flex-column feedback-field'>
                                    <label htmlFor='fName' >First Name</label>
                                    <input type='text' className='p-2 rounded-3' id='fName' placeholder='First Name' required />                        
                                </div> 
                                <div className='d-flex flex-column feedback-field'>
                                    <label htmlFor='lName' >Last Name</label>
                                    <input type='text' className='p-2 rounded-3' id='lName' placeholder='Last Name' required />                        
                                </div>
                            </div>
                            <div>
                                <textarea placeholder='Write your feedbacks for our products/services here' className='rounded-3 w-100 p-3' rows='10' style={{resize: 'none'}}></textarea>
                            </div>
                            <div className='ms-auto'>
                                <button type='button' onClick={{handleFeedbackSubmit}} className='btn btn-success rounded-3 px-3 text-uppercase'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default TestimonyPage