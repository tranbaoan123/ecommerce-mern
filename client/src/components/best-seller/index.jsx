import React, { useEffect, useState } from 'react'
import { apiGetProducts } from '../../api/product'
import Slider from "react-slick";
import Product from '../product'
const tabs = [
    { id: 1, name: 'best sellers' },
    { id: 2, name: 'new arrivals' },
]
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};
const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState([])
    const [newProducts, setNewProducts] = useState([])
    const [activeTab, setActiveTab] = useState(1)
    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        const response = await Promise.all([apiGetProducts({ sort: '-sold' }), apiGetProducts({ sort: '-createdAt' })])
        setBestSellers(response[0]?.success ? response[0]?.result : [])
        setProducts(response[0]?.success ? response[0]?.result : [])
        setNewProducts(response[1]?.success ? response[1]?.result : [])
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    useEffect(() => {
        if (activeTab === 1) setProducts(bestSellers)
        if (activeTab === 2) setProducts(newProducts)
    }, [])
    return (
        <div>
            <div className='flex text-[20px] gap-8 border-b-2 pb-2 border-main'>
                {tabs.map((tab) => {
                    return <span key={tab.id} onClick={() => setActiveTab(tab.id)} className={`${activeTab === tab.id ? 'cursor-pointer font-bold uppercase tracking-wide border-r text-[#505050]' : 'cursor-pointer font-bold uppercase tracking-wide border-r text-gray-400'}`}>{tab.name}</span>
                })}
            </div>
            <div className='mt-4'>
                <Slider {...settings}>
                    {products?.map((product) => {
                        return <Product key={product._id} data={product} />
                    })}
                </Slider>
            </div>
            <div>
                <img src="" alt="" />
                <img src="" alt="" />
            </div>
        </div>
    )
}

export default BestSeller