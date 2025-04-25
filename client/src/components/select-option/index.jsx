import React from 'react'

const SelectOption = ({ icon }) => {
    return (
        <div className='bg-white p-3 rounded-full shadow-sm hover:bg-gray-800 hover:text-white cursor-pointer transition-all'>{icon}</div>
    )
}

export default SelectOption