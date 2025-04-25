import React from 'react'
import logo from '../../assets/logo.png'
import { icons } from '../../utils/icons'
import { Link } from 'react-router-dom'
import paths from '../../utils/paths'
const { HiPhone, MdEmail, FaUserCircle, BsFillHandbagFill } = icons
const Header = () => {
  return (
    <div className='w-main h-[110px] flex justify-between p-[35px]'>
      <Link to={`/${paths.HOME}`}>
        <img src={logo} alt="logo" className='w-[234px] object-contain' />
      </Link>
      <div className='flex'>
        <div className='text-[13px] flex flex-col px-5 border-r'>
          <span className='flex items-center gap-6'>
            <span><HiPhone color='red' /></span>
            <span className='font-semibold'>(+1800) 000 8808</span>
          </span>
          <span className='text-[#505050]'>
            Mon-Sat 9:00AM - 8:00PM
          </span>
        </div>
        <div className='text-[13px] flex items-center flex-col px-5 border-r'>
          <span className='flex items-center gap-2'>
            <span><MdEmail color='red' /></span>
            <span className='font-semibold uppercase'>support@tadathemes.com</span>
          </span>
          <span className='text-[#505050]'>
            Online Support 24/7
          </span>
        </div>
        <div className='flex items-center justify-center gap-2 px-5 border-r'>
          <span><BsFillHandbagFill color='red' /></span>
          <span>0 item(s)</span>
        </div>
        <div className='flex items-center justify-center px-5 border-r'><span><FaUserCircle size={24} /></span></div>
      </div>
    </div>
  )
}

export default Header