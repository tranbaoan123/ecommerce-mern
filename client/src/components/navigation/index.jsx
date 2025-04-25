import React from 'react'
import { navigation } from '../../utils/constants'
import { NavLink } from 'react-router-dom'
const Navigation = () => {
    return (
        <div className='w-main h-[48px] py-2 text-sm flex items-center'>
            {navigation.map((el) => {
                return <NavLink className={({ isActive }) => isActive ? `uppercase pr-4 hover:text-main text-main` : `uppercase pr-4 hover:text-main`} to={el.path} key={el.id}>{el.value}</NavLink>
            })}
        </div>
    )
}

export default Navigation