import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Dashboard, ProductPage, Profile, ContentMgmt, CustomerMgmt, OrderMgmt, History, PreOrder } from 'Admin'
import { Aside } from 'Components'
const AdminRoute = () => {
    return (
        <>
            <Aside />
            <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/products' element={<ProductPage />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/content-management' element={<ContentMgmt />} />
                <Route path='/customer-management' element={<CustomerMgmt />} />
                <Route path='/order-management' element={<OrderMgmt />} />
                <Route path='/history' element={<History />} />
                <Route path='/pre-order' element={<PreOrder />} />
            </Routes>
        </>
    )
}

export default AdminRoute