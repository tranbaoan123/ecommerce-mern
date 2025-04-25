import React from 'react'
import banner from '../../assets/banner.webp'
const Banner = () => {
    return (
        <div className='w-full'>
            <img src={banner} alt="banner" className='object-contain' />
        </div>
    )
}

export default Banner