import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ConfirmOrder, ConfirmPreOrder } from 'Pages'

const SingleView = () => {
    return (
        <>
            <Routes>
                <Route path='/pre-order' element={<ConfirmPreOrder />} />
                <Route path='/order' element={<ConfirmOrder />} />
            </Routes>
        </>
    )
}

export default SingleView