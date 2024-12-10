/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import blackman from '../../../public/assets/blackman.png'
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Loader from '@/shared/Loader';
import {updateStatus } from '@/redux/features/asset_management/assetSlice';
import successIcon from '../../../public/assets/success notice.png'

interface ModalProps {
    onClose: () => void;
    item: Record<string, any> | null;
  }

const ApprovedModal = ({onClose, item}: ModalProps) => {
    const dispatch = useAppDispatch();
    const {isLoading, isError, errorMsg} = useAppSelector(state => state.assets);
    const [notify, setNotify] = useState(false);
    const [declineModal, setDeclineModal]  = useState(false)
    const [declineReason, setDeclineReason] = useState("")
    const [error, setError] = useState("")


    const handleStatusChange = (id: number, status: 'Approved' | 'Declined')=> {
        if (status === "Declined"){
            setDeclineModal(true)
        }else {
            dispatch(updateStatus({id, status}))
            setNotify(true)
        }
    };

    const handleDeclineSubmit = (id: number) => {
        if(!declineReason.trim()){
            setError("Please enter your reason before submitting!")
            return
        }
        if(declineReason.trim()){
            dispatch(updateStatus({id: id, status: 'Declined', reason: declineReason}));
            setDeclineModal(false)
            setDeclineReason("")
            onClose()
        }
    };

    const handleNotify = () => {
        setNotify(false)
        onClose()
    }

    // const handleFetch = (queryParams: string) => {
    //     dispatch(FetchAssets(queryParams))
    // };

    if(isLoading){
        return <Loader/>
    }
    
    if(isError){
        return <p>{errorMsg}</p>
    }
    
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99]'>
        <div className='bg-white rounded-lg shadow-lg w-3/4 p-6 relative'>
            <IoCloseCircleOutline onClick={onClose} size={30} className='absolute right-4 text-[#B0B0B0] cursor-pointer' />
            <div className="flex gap-4 py-5 pt-5 overflow-hidden">
                <div className="w-1/2 rounded overflow-hidden">
                    {/* <Image src={item?.meta?.images[0]?.public_url} alt="icon" width={100} height={100}/> */}
                    <Image src={blackman} alt="icon" className='w-full h-full'/>
                </div>
                <ul className="w-1/2 p-5 py-10 space-y-5">
                    <li className="flex justify-between">
                        <p className="flex flex-col">
                            <span className="font-bold text-2xl text-[#2F4858]">{item?.title}</span>
                            <span className="text-sm">By: {item?.meta?.author[0]?.first_name} {item?.meta?.author[0]?.last_name}</span>
                        </p>
                        
                    </li>
                    <li className="text-sm flex flex-col">
                        <span>Category: Frame</span>
                        <span>Sub-Category: null</span>
                        <span>Upload Date: {new Date(item?.updated_at).toLocaleDateString()}</span>
                        <span>Status: <i className='text-green-500'>{item?.status}</i></span>
                    </li>
                    <li className=" text-gray-600">{item?.description}</li>
                    <li>Tags: <span>{item?.meta?.tag?.name} {item?.meta?.tag?.name}</span></li>
                    <li className='flex pt-5 gap-4'>
                        <button className='flex p-3 px-5 border rounded-lg text-[#2F4858]/20 bg-[#DBDBDB] cursor-not-allowed' disabled onClick={() => {handleStatusChange(item?.id, 'Approved');}}>Approve</button>
                        <button className='flex p-3 px-5 border rounded-lg bg-[#2F4858] text-white' onClick={() => {handleStatusChange(item?.id, 'Declined');}}>Decline</button>
                    </li>
                </ul>
            </div>
        </div>

        {/* done notification */}
        <div>
            {
                notify && (
                    <div className='fixed inset-0 transition-all flex items-center justify-center bg-black bg-opacity-50 z-[99]'>
                        <div className='bg-white rounded-lg shadow-lg w-1/3 h-[350px] p-6 relative '>
                            <ul>
                                <li><Image src={successIcon} alt='image' /></li>
                                <li>Approved</li>
                                <li>
                                    <button onClick={() => handleNotify} className='bg-[#2F4858] text-white'>Done</button>
                                </li>
                            </ul>
                        </div>

                    </div>
                )
            }
        </div>

        {/* decline modal */}
        {declineModal && (
            <div className='fixed inset-0 transition-all flex items-center justify-center bg-black bg-opacity-50 z-[99]'>
                <div className='bg-white rounded-lg shadow-lg w-1/3 h-[350px] p-6 relative '>
                    <IoCloseCircleOutline onClick={ () => setDeclineModal(false)} size={30} className='absolute right-4 text-[#B0B0B0] cursor-pointer' />
                    <div className='flex flex-col h-full justify-around items-center py-10'>
                        <p className='pb-5 font-bold text-[#333333] text-2xl'>Decline Request</p>
                        <span className='text-red-500 text-sm'>{error}</span>
                        <textarea 
                            placeholder='write a reason'
                            value={declineReason}
                            onChange={(e) => setDeclineReason(e.target.value)}
                            className='border w-full h-1/3 outline-none p-5 rounded-lg' 
                            required    
                        />
                        <div className='gap-4 flex pt-2'>
                            <button onClick={() => setDeclineModal(false)} className='text-[#2F4858] bg-[#D7D7D7] p-3 px-10 rounded-lg'>Cancel</button>
                            <button 
                                onClick={() => {
                                handleDeclineSubmit(item?.id);
                                // setActiveTab("approved"); 
                                // handleFetch("Approved")
                                }
                                } 
                                className='bg-[#B00712] text-white p-3 px-10 rounded-lg'
                                >
                                    Decline
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default ApprovedModal