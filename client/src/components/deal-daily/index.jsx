import React, { useEffect, useState } from 'react'
import { icons } from '../../utils/icons'
import { apiGetProducts } from '../../api/product'
import productDefault from '../../assets/product-default.webp'
import { formatMoney, renderStarFormat } from '../../utils/helper'
import CountDown from '../countdown'
const { AiFillStar, IoMdMenu } = icons
let idInterval;
const DealDaily = () => {
    const [daily, setDaily] = useState(null)
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    const [expireTime, setExpireTime] = useState(false)
    const fetchDealDaily = async () => {
        const response = await apiGetProducts({ limit: 1, page: Math.round(Math.random() * 10) })
        if (response.success) {
            setDaily(response.result[0])
            const h = 24 - new Date().getHours()
            const m = 60 - new Date().getMinutes()
            const s = 60 - new Date().getSeconds()
            setHour(h)
            setMinute(m)
            setSecond(s)
        }
        else {
            setHour(8)
            setMinute(10)
            setSecond(1)
        }
    }
    useEffect(() => {
        idInterval && clearInterval(idInterval)
        fetchDealDaily()
    }, [expireTime])
    useEffect(() => {
        idInterval = setInterval(() => {
            if (second > 0) setSecond(prev => prev - 1)
            else {
                if (minute > 0) {
                    setMinute(prev => prev - 1)
                    setSecond(60)
                } else {
                    if (hour > 0) {
                        setHour(prev => prev - 1)
                        setMinute(60)
                        setSecond(60)
                    } else {
                        setExpireTime(!expireTime)
                    }
                }
            }

        }, 1000)
        return () => {
            clearInterval(idInterval)
        }
    }, [second, minute, hour, expireTime])

    return (
        <div className='border w-full flex-auto p-4'>
            <div className='flex items-center gap-8'>
                <AiFillStar color='red' size={24} />
                <h2 className='uppercase font-semibold text-[#505050] text-xl'>Daily Deals</h2>
            </div>
            <div className='w-full flex flex-col items-center pt-4'>
                <img src={daily?.thumb || productDefault} alt="product image" className='object-cover' />
                <div className="flex flex-col gap-2">
                    <span>{renderStarFormat(daily?.totalRating)}</span>
                    <span className='line-clamp-2'>{daily?.title}</span>
                    <span>{formatMoney(daily?.price)} VND</span>
                </div>
            </div>
            <div className='px-4 mt-4'>
                <div className='flex justify-center gap-2 items-center mb-4 bg-[#F4F4F4] rounded-sm'>
                    <CountDown unit={'Hours'} number={hour} />
                    <CountDown unit={'Minutes'} number={minute} />
                    <CountDown unit={'Seconds'} number={second} />
                </div>
                <button type='button' className='flex items-center justify-center gap-1 w-full bg-main hover:bg-gray-800 text-white font-medium py-2'>
                    <IoMdMenu />
                    <span>Options</span>
                </button>
            </div>
        </div>
    )
}

export default DealDaily