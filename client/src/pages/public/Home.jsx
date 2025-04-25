import React from 'react'
import Banner from '../../components/banner'
import BestSeller from '../../components/best-seller'
import Sidebar from '../../components/sidebar'
import DealDaily from '../../components/deal-daily'
import FeatureProduct from '../../components/featured-product'
const Home = () => {

    return (
        <>
            <div className='w-main flex'>
                <div className='flex flex-col gap-5 w-[25%] flex-auto'>
                    <Sidebar />
                    <DealDaily />
                </div>
                <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className='my-8'>
                <FeatureProduct />
            </div>
            <div className="w-full h-[500px]"></div>
        </>
    )
}

export default Home