import React, { useState } from 'react'
import defaultProduct from '../../assets/product-default.webp'
import { formatMoney, renderStarFormat } from '../../utils/helper.jsx'
import SelectOption from '../select-option/index.jsx'
import { icons } from '../../utils/icons.js'
const { AiFillEye, BsFillSuitHeartFill, IoMdMenu } = icons
const Product = ({ data }) => {
    const [show, setShow] = useState(false)
    return (
        <div className='w-[95%] border flex flex-col gap-2 items-center text-center' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <div className='relative'>
                <div className='w-full relative'>
                    {show && <div className='absolute bottom-0 left-0 right-0 flex justify-center gap-2 animate-slide-top'>
                        <SelectOption icon={<AiFillEye />} />
                        <SelectOption icon={<BsFillSuitHeartFill />} />
                        <SelectOption icon={<IoMdMenu />} />
                    </div>}
                    <img src={data.thumb || defaultProduct} alt={data.title} className='object-cover w-[243px] h-[243px]' />
                </div>
                <div className="flex flex-col gap-2">
                    <span>{renderStarFormat(data?.totalRatings)}</span>
                    <span className='line-clamp-2'>{data?.title}</span>
                    <span>{formatMoney(data?.price)} VND</span>
                </div>
                <div className='absolute top-2 -right-4'>
                    <p className="card-price">New</p>
                </div>
            </div>
        </div>
    )
}

export default Product