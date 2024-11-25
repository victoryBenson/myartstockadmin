import React from 'react'
import Image from 'next/image'
import logoIcon from '../../public/assets/logo.png'

const Logo = () => {
  return (
    <div>
        <Image src={logoIcon} alt='image'/>
    </div>
  )
}

export default Logo