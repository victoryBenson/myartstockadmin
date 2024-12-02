'use client'
import React from 'react'

const AllContent = ({params}: {params: Promise<{id: number}>}) => {
  const {id} = React.use(params)

  return (
    <div>
      <p className='text-center font-bold'>No record found! {id}</p>
    </div>
  )
}

export default AllContent