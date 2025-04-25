import React from 'react'
import { formatMoney, renderStarFormat } from '../../utils/helper'

const ProductCard = ({ image, title, totalRating, price }) => {

    return (
        <div className='w-1/3 flex-auto flex items-center px-[10px] my-4'>
            <div className='flex items-center w-full border'>
                <img src={image} alt="product" className='w-[120px] object-contain p-4' />
                <div className="flex flex-col gap-2 text-xs">
                    <span className='line-clamp-2 capitalize text-sm'>{title.toLowerCase()}</span>
                    <span>{renderStarFormat(totalRating)}</span>
                    <span>{formatMoney(price)} VND</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard