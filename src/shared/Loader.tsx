import React from 'react'
import { TbLoaderQuarter } from 'react-icons/tb'

const Loader = () => {
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
        <span className='animate-spin'>
            <TbLoaderQuarter />
        </span>
        please wait...
    </div>
  )
}

export default Loader