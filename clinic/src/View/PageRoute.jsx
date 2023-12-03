import React from 'react'
import { Navbar } from 'Components'
import { Routes, Route } from 'react-router-dom'
import { LandingPage, NewsFeedPage, FeaturedPage, ViewItem, AboutPage, ContactPage, ServicePage, TestimonyPage, UserCart } from 'Pages'
import { LoginPage, UserRegistration, ForgotPassword } from 'Auth'

const PageRoute = () => {
    return (
        <>
        <Navbar />
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/featured' element={<FeaturedPage />} />
            <Route path='/service' element={<ServicePage />} />
            <Route path='/newsfeed' element={<NewsFeedPage />} />
            <Route path='/testimony' element={<TestimonyPage />} />
            <Route path='/view-item' element={<ViewItem />} />
            <Route path='/cart' element={<UserCart />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/auth/user-login' element={<LoginPage />} />
            <Route path='/auth/register' element={<UserRegistration />} />
            <Route path='/auth/forgot-password' element={<ForgotPassword />} />
        </Routes>
        </>
    )
}

export default PageRoute