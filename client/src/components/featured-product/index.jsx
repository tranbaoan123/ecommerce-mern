import React, { useEffect, useState } from 'react'
import { apiGetProducts } from '../../api/product'
import ProductCard from '../product-card'
import bannerHeadPhone from '../../assets/banner-headphone.webp'
import bannerPhone from '../../assets/banner-phone.webp'
const FeatureProduct = () => {
    const [products, setProducts] = useState(null)
    const fetchProduct = async () => {
        const response = await apiGetProducts({ limit: 9 })
        console.log(response);

        if (response.success) setProducts(response.result)

    }
    useEffect(() => {
        fetchProduct()
    }, [])
    return (
        <div className='w-full'>
            <h3 className='text-[20px] font-semibold py-[5px] border-b-2 border-main'>FEATURED PRODUCT</h3>
            <div className='flex flex-wrap'>
                {products?.map((product) => {
                    return <ProductCard key={product._id} image={product.thumb} title={product.title} totalRating={product.totalRating} price={product.price} />
                })}
            </div>
            <div className='flex justify-between'>
                <img src={bannerHeadPhone} alt="banner headphone" />
                <div className='flex flex-col justify-between'>
                    <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661" alt="" />
                    <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661" alt="" />
                </div>
                <img src={bannerPhone} alt="banner phone" />
            </div>
        </div>
    )
}

export default FeatureProduct