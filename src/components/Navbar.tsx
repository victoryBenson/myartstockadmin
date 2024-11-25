'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BsBell } from 'react-icons/bs'
import profileImage from '../../public/assets/Ellipse 1.png'

const Navbar = () => {
    const pathname = usePathname()
    const displayPathname = pathname === '/dashboard' ? 'Dashboard' 
    : pathname.includes('/dashboard/account_settings/customer') ? 'Customer Management' 
    : pathname.includes('/dashboard/account_settings/vendor') ? 'Vendor Management' 
    : pathname.includes('/dashboard/account_settings/contributor') ? 'Contributor Management'  
    : pathname

  return (
    <nav>
        <div className={`h-20 bg-white flex items-center px-5 shadow justify-between z-[99]`}>
            <div className='font-bold text-lg text-[#6D6D6D]'>{displayPathname}</div>
            <div className='flex gap-2 items-center'>
                <BsBell size={20} className='mx-2' />
                <Image src={profileImage} alt="profileImage" className='object-contain'/>
                <p className='flex flex-col'>
                    <span className='font-bold'>Daniel White</span>
                    <span className='text-gray-500'>contributor</span>
                </p>
            </div>
        </div>
    </nav>
  )
}

export default Navbar