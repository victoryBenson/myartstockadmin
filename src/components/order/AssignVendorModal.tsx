'use client'
import { fetchVendors } from '@/redux/features/vendor/vendorSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Loader from '@/shared/Loader';
import { highlightMatch, truncateText } from '@/utils/utils';
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { IoCloseCircleOutline } from 'react-icons/io5'
import { LuFilter } from 'react-icons/lu';

interface ItemProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: Record<string, any> | null;
    onClose: () => void;
};

const AssignVendorModal = ({onClose, item}: ItemProps) => {
    const {isLoading, isError, vendors:data, errorMsg} = useAppSelector(state => state.vendor);
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [durationModal, setDurationModal]  = useState(false)
    // const [notify, setNotify] = useState(false);
    const [duration, setDuration] = useState("")
    const [selectedVendorId, setSelectedVendorId] = useState<number | null>(null);
    const [error, setError] = useState("")
    console.log(item);

    useEffect(() => {
        dispatch(fetchVendors())
    },[dispatch])
  

    const handleSubmit = () => {
      if (selectedVendorId !== null) {
        const selectedUser = data.find((user) => user.id === selectedVendorId);
        setDurationModal(true)
        console.log("Selected User:", selectedUser);
      } else {
        setError("Please select a vendor.");
      }
    };

    if(isLoading){
        return <Loader/>  
    }
  
    if(isError){
        return <p>{errorMsg}</p>
    }

  return (
    <div className='fixed inset-0 transition-all flex items-center justify-center bg-black bg-opacity-50 z-[99]'>
        <div className='bg-white rounded-lg shadow-lg w-5/6  h-[95%] p-8  relative '>
            <IoCloseCircleOutline onClick={onClose} size={30} className='absolute right-4 text-[#B0B0B0] cursor-pointer' />
            <div className="overflow-y-auto">
                <div>
                    <p className='text-[#333333] text-2xl font-semibold'>Assign Order to a vendor</p>
                    <p className='text-[#5D5D5D] py-2'>Select the vendor that offers the required service from the options below.</p>
                </div>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-1 text-[#808080] text-sm font-normal'>
                        <label htmlFor="filter" className='flex p-2 items-center text-gray-500'><LuFilter />Filter</label>
                        <select name="data" id="data" className='border p-3 outline-none rounded-lg'>
                            <option value="all">-All-</option>
                            <option value="all">Active</option>
                            <option value="pending">In-Active</option>
                        </select>
                    </div>
                    <div className='relative border overflow-hidden rounded-lg'>
                        <CiSearch className='absolute top-4 left-2'/>
                        <input 
                            type="search" 
                            name="search" 
                            id="search" placeholder='Search' 
                            className='ml-4 outline-none w-full p-3'
                            onChange={(e) => setSearchQuery( e.target.value) }
                        />
                    </div>
                </div> 
                <table className='min-w-full bg-white border border-gray-200/40 overflow-y-auto h-full py-5 my-3'>
                    <thead>
                        <tr className="bg-gray-100/40 text-[#C3C3C3] font-semibold text-xs">
                            <th className="py-4 px-4 text-left border-b">S/N</th>
                            <th className="py-4 px-4 text-left border-b">Business Name</th>
                            <th className="py-4 px-4 text-left border-b">Email Address</th>
                            <th className="py-4 px-4 text-left border-b">Phone Number</th>
                            <th className="py-4 px-4 text-left border-b">Vendor Type</th>
                            <th className="py-4 px-4 text-left border-b">Location</th>
                            <th className="py-4 px-4 text-left border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { !data && !isLoading?
                        
                        <tr className='py-5 font-bold text-[#333333]'>
                            <td className='py-4 px-4 text-center'>No matching data found</td>
                        </tr>
                        :
                        data.map((user) => {
                            return (
                                <tr key={user.id} className='hover:bg-gray-50 text-[#333333] font-normal text-xs'>
                                    <td className='py-2 px-4 border-b'>
                                        <input
                                            type="radio"
                                            name="user"
                                            value={user.id}
                                            checked={selectedVendorId === user.id}
                                            onChange={() => setSelectedVendorId(user.id)}
                                            className="form-radio"
                                        />
                                    </td>
                                    <td className='py-3 px-4 border-b'>{ highlightMatch(`${truncateText(user.name, 10)}`, searchQuery)}</td>
                                    <td className='py-3 px-4 border-b'>{ highlightMatch(`${truncateText(user.email, 10)}`, searchQuery)}</td>
                                    <td className='py-3 px-4 border-b'>{user.phone_number ? truncateText(user.phone_number, 10) : "null"}</td>
                                    <td className='py-3 px-4 border-b'>{user.type ? user.type : "null"}</td>
                                    <td className='py-3 px-4 border-b'>{user.country ? user.country : "null"}</td>
                                    <td className='py-3 px-4 border-b text-sm'>{user.is_active === true? <span className='bg-[#06D6A00D] rounded-lg px-2 py-1 text-xs text-[#2F4858]'>Active</span> : <span className='bg-[#F99E0B40] text-orange rounded-lg px-2 py-1 text-xs text-[#F99E0B]'>In-active</span> }</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <p className='text-red-500 text-sm text-center '>{error}</p>
                <div className='items-center justify-center text-white gap-4 flex py-5'>
                    <button className='bg-[#D7D7D7] py-3 px-5 rounded cursor-not-allowed'>Cancel</button>
                    <button
                        onClick={handleSubmit}
                        // disabled={selectedVendorId === null}
                        className={`bg-[#2F4858] text-white p-3 px-10 rounded-lg ${selectedVendorId ? 'bg-[#2F4858]' : 'bg-[#2F4858]/60 cursor-not-allowed' }`}
                        >Next
                    </button>
                </div>                
            </div>
        </div>

        {/* decline modal */}
        {durationModal && (
        <div className='fixed inset-0 transition-all flex items-center justify-center bg-black bg-opacity-50 z-[99]'>
            <div className='bg-white rounded-lg shadow-lg w-1/3 h-[50%] p-6 relative '>
                <IoCloseCircleOutline onClick={onClose} size={30} className='absolute right-4 text-[#B0B0B0] cursor-pointer' />
                <div className='flex flex-col h-full justify-around items-center py-10'>
                    <p className='pb-5 font-bold text-[#333333] text-2xl'>Set Duration</p>
                    <p className='text-[#333333] text-lg items-start w-full flex justify-start'>Set a duration for vendor to fulfill order</p>
                    <select value={duration} id="update" required onChange={(e) => setDuration(e.target.value)} className='py-3 px-2 w-full border rounded'>
                        <option value="10">10 day</option>
                        <option value="9">9 day</option>
                        <option value="8">8 day</option>
                        <option value="7">7 day</option>
                    </select>
                    <div className='gap-4 flex pt-5'>
                        <button 
                           onClick={handleSubmit}
                           disabled={selectedVendorId === null}
                            className={`bg-[#2F4858] text-white p-3 px-10 rounded-lg `}
                            >
                                Assign
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default AssignVendorModal