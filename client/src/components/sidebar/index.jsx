import React, { useEffect, useState } from 'react'
import { apiGetCategories } from '../../api/api'
import { NavLink } from 'react-router-dom'
import { createSlug } from '../../utils/helper.jsx'
const Sidebar = () => {
    const [categories, setCategories] = useState([])
    const fetchCategories = async () => {
        const response = await apiGetCategories()
        if (response.success) {
            setCategories(response.data)
        }

    }
    useEffect(() => {
        fetchCategories()
    }, [])
    return (
        <div className='flex flex-col border'>{categories?.map((category) => {
            return <NavLink key={createSlug(category.title)} to={createSlug(category.title)} className={({ isActive }) => isActive ? 'block bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main' : 'block px-5 pt-[15px] pb-[14px] text-sm hover:text-main'}>{category.title}</NavLink>

        })}</div>
    )
}

export default Sidebar