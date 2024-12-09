'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { highlightMatch, truncateText } from '@/utils/utils'
import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'
import { LuFilter } from 'react-icons/lu';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link'
import { fetchVendors } from '@/redux/features/vendor/vendorSlice'
import Loader from '@/shared/Loader'

const Vendor = () => {
    const {isLoading, isError, vendors:data, errorMsg} = useAppSelector(state => state.vendor);
    const dispatch = useAppDispatch();
    const [viewMoreBtn, setviewMoreBtn] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    
    const toggleMenu = (id: number) => {
        setviewMoreBtn(viewMoreBtn === id ? null : id);
    };

    useEffect(() => {
      dispatch(fetchVendors())
    },[dispatch])

    if(isLoading){
      return <Loader/>  
    }

    if(isError){
      return <p>{errorMsg}</p>
    }

    
    const totalRows = data.length
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const displayData = data.slice(startIndex, startIndex + rowsPerPage);


    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Function to highlight matches
    // const highlightMatch = (text: string, query: string) => {
    //      if (!query) return text;

    //     const parts = text.split(new RegExp(`(${query})`, "gi"));
    //         return parts.map((part, i) =>
    //         part.toLowerCase() === query.toLowerCase() ? (
    //             <span key={i} className="bg-orange-300 text-white font-bold">
    //             {part}
    //             </span>
    //         ) : (
    //             part
    //         )
    //         );
    // };

    // Filtered Data
    const filteredData = displayData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.personnel_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Math.min(100, Number(event.target.value)));
        setRowsPerPage(value);
        setCurrentPage(1); 
    };


  return (
    <div className='px-5'>
        <div className='flex justify-between p-5'>
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
        <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-200/40'>
                <thead>
                    <tr className="bg-gray-100/40 text-[#C3C3C3] font-semibold text-xs">
                        <th className="py-4 px-4 text-left border-b">S/N</th>
                        <th className="py-4 px-4 text-left border-b">Business Name</th>
                        <th className="py-4 px-4 text-left border-b">Full Name</th>
                        <th className="py-4 px-4 text-left border-b">Email Address</th>
                        <th className="py-4 px-4 text-left border-b">Phone Number</th>
                        <th className="py-4 px-4 text-left border-b">Vendor Type</th>
                        <th className="py-4 px-4 text-left border-b">Location</th>
                        <th className="py-4 px-4 text-left border-b">Status</th>
                        <th className="py-4 px-4 text-left border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    { !filteredData && !isLoading?
                    
                    <tr className='py-5 font-bold text-[#333333]'>
                        <td className='py-4 px-4 text-center'>No matching data found</td>
                    </tr>
                    :
                    filteredData.map((user, index) => {
                        return (
                            <tr key={user.id} className='hover:bg-gray-50 text-[#333333] font-normal text-xs'>
                                <td className='py-2 px-4 border-b'>{index + 1}</td>
                                <td className='py-3 px-4 border-b'>{ highlightMatch(`${truncateText(user.name, 10)}`, searchQuery)}</td>
                                <td className='py-3 px-4 border-b'>{highlightMatch(user.personnel_name, searchQuery)}</td>
                                <td className='py-3 px-4 border-b'>{ highlightMatch(`${truncateText(user.email, 10)}`, searchQuery)}</td>
                                <td className='py-3 px-4 border-b'>{user.phone_number ? truncateText(user.phone_number, 10) : "null"}</td>
                                <td className='py-3 px-4 border-b'>{user.type ? user.type : "null"}</td>
                                <td className='py-3 px-4 border-b'>{user.country ? user.country : "null"}</td>
                                <td className='py-3 px-4 border-b text-sm'>{user.is_active === true? <span className='bg-[#06D6A00D] rounded-lg px-2 py-1 text-xs text-[#2F4858]'>Active</span> : <span className='bg-[#F99E0B40] text-orange rounded-lg px-2 py-1 text-xs text-[#F99E0B]'>In-Active</span> }</td>
                                <td className='py-2 px-4 border-b relative'>
                                    <BsThreeDotsVertical onClick={ () => toggleMenu(user.id)}  className='cursor-pointer'/>
                                    {viewMoreBtn === user.id && (
                                        <div className="absolute right-5 mt-2 w-40 bg-white shadow-lg rounded-lg z-10 text-[#333333]">
                                            <ul className="p-2 text-xs">
                                                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                                                    <Link href={`/dashboard/account_settings/vendor/${user.id}`}>View More</Link>
                                                </li>
                                                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Disable</li>
                                            </ul>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <div className='flex justify-between items-center py-5 text-sm'>
                <div>
                    <label>
                        Show Rows:
                        <input
                        type="number"
                        min="1"
                        max="50"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        style={{ width: "50px", marginLeft: "0.5rem" }}
                        className='text-[#6D6D6D]'
                        />
                    </label>
                </div>
                <div className='flex items-center gap-2'>
                    <button onClick={handlePrevious} disabled={currentPage === 1} className={`flex items-center gap-1 bg-[#B20021] text-white p-3 rounded-lg ${currentPage === 1 && 'bg-opacity-10'}`}>
                        <FaArrowLeft />
                        Previous
                    </button>
                    <span>
                     {currentPage} 
                    </span>
                    <button onClick={handleNext} disabled={currentPage === totalPages} className={`flex items-center gap-1 bg-[#B20021] text-white p-3 rounded-lg ${currentPage === totalPages && 'bg-opacity-10'}`}>
                        Next
                        <FaArrowRight />
                    </button>
                </div>
                <div>
                    Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
                    {Math.min(currentPage * rowsPerPage, totalRows)} of {totalRows} rows
                </div>
            </div>
        </div>
    </div>
  )
}

export default Vendor;