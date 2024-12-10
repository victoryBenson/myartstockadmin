'use client'
import { updateOrderStatus } from '@/redux/features/orders/orderSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5';

interface ItemModalProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: Record<string, any> | null;
    onClose: () => void;
  }




const UpdateStatus = ({ item, onClose }: ItemModalProps) => {
        const dispatch = useAppDispatch();
        const {isLoading} = useAppSelector(state => state.order)
        const [statusUpdate, setStatusUpdate] = useState(item?.status || "")


        const handleUpdateStatus = (id: number)=> {
            if(statusUpdate.trim()){
                dispatch(updateOrderStatus({id: id, status: statusUpdate}));
            }
            onClose()
        };


  return (
    <div className='fixed inset-0 transition-all flex items-center justify-center bg-black bg-opacity-50 z-[99]'>
        <div className='bg-white rounded-lg shadow-lg w-1/3 h-[350px] p-6 relative '>
            <IoCloseCircleOutline onClick={onClose} size={30} className='absolute right-4 text-[#B0B0B0] cursor-pointer' />
            <div className='flex flex-col h-full justify-around items-center py-10'>
                <p className='pb-5 font-bold text-[#333333] text-2xl'>Update Status</p>
                <p className='text-[#333333] text-lg items-start w-full flex justify-start'>Update order Status</p>
                <select  id="update" required value={statusUpdate} onChange={(e) => setStatusUpdate(e.target.value)} className='py-3 px-2 w-full border rounded'>
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="paid">paid</option>
                </select>
                <div className='gap-4 flex pt-2'>
                    <button 
                        onClick={() => {
                            handleUpdateStatus(item?.id); 
                        }}
                        className='bg-[#2F4858] text-white p-3 px-10 rounded-lg'
                        disabled={isLoading}
                        >
                            Update
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateStatus;