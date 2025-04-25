import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/header'
import Navigation from '../../components/navigation'

const Public = () => {
    return (
        <div className='w-full flex flex-col items-center'>
            <Header />
            <Navigation />
            <div className="w-main">
                <Outlet />
            </div>
        </div>
    )
}

export default Public