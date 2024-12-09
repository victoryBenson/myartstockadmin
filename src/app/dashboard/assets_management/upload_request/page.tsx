/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import ApprovedModal from '@/components/AppprovedModal';
import DeclineModal from '@/components/DeclineModal';
import PendingModal from '@/components/PendingModal';
import { FetchAssets, updateStatus } from '@/redux/features/asset_management/assetSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Loader from '@/shared/Loader';
import Image from 'next/image';
import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { LuFilter } from 'react-icons/lu';
import { PiRadioButtonFill } from 'react-icons/pi';
import { TbCurrencyNaira } from 'react-icons/tb';
import successIcon from '../../../../../public/assets/success notice.png'
import { IoCloseCircleOutline } from 'react-icons/io5';


const Page = () => {
    const dispatch = useAppDispatch();
    const {isLoading, isError, errorMsg, assets:data} = useAppSelector(state => state.assets)
    const [activeTab, setActiveTab] = useState<string>('pending');
    const [viewMoreBtn, setviewMoreBtn] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [modal, setModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState<Record<string, any> | null>(null);
    const [notify, setNotify] = useState(false);
    const [declineModal, setDeclineModal]  = useState(false)
    const [declineReason, setDeclineReason] = useState("")
    


    // handle-modal
    const handleModalDetails = (param: Record<string, any>) =>{
        setSelectedItem(param)
        setModal(true)
    };

    const handleCloseModal = () => {
        setModal(false);
        setSelectedItem(null);
      };

    const tabs = [
        {id: 'pending', label: "Pending Request", queryParams: "Pending"},
        {id: 'declined', label: "Decline Request", queryParams: "Declined"},
        {id: 'approved', label: "Approved Request", queryParams: "Approved"},
    ];

    // fetch data
    const handleFetch = (queryParams: string) => {
        dispatch(FetchAssets(queryParams))
    };

    const toggleMenu = (id: number) => {
        setviewMoreBtn(viewMoreBtn === id ? null : id);
    };

    

    const totalRows = data.length
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const displayData = data.slice(startIndex, startIndex + rowsPerPage);


    // next btn
    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // previous btn
    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Filtered Data
    const filteredData = displayData.filter((item) =>
         item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Math.min(100, Number(event.target.value)));
        setRowsPerPage(value);
        setCurrentPage(1); 
    };


    const handleStatusChange = (id: number, status: 'Approved' | 'Declined')=> {
        if (status === "Declined"){
            setDeclineModal(true)
        }else {
            dispatch(updateStatus({id, status}))
            setNotify(true)
        }
    };

    const handleDeclineSubmit = (id: number) => {
        if(declineReason.trim()){
            dispatch(updateStatus({id: id, status: 'Declined', reason: declineReason}));
            setDeclineModal(false)
            setDeclineReason("")
            handleCloseModal()
        }
    };

    const handleNotify = () => {
        setNotify(false)
        // handleCloseModal()
    }

    // const handleCloseNotify = () => {
    //     setNotify(false)
    //     // handleCloseModal()
    // }

    

    if(isLoading){
        return <Loader/>
    }
    
    if(isError){
        return <p>{errorMsg}</p>
    };


  return (
    <div>
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
        {/* tabs */}
        <div className='px-5 pb-1 pt-10 flex gap-4 border-b '>
            {tabs.map(tab => (
                <button key={tab.id} className={`outline-none transition-all duration-300 ease-in-out hover:text-black ${activeTab === tab.id ? 'font-bold underline decoration-4 decoration-red-500 underline-offset-8 text-black' : 'text-[#B0B0B0]' } `} onClick={() => {setActiveTab(tab.id); handleFetch(tab.queryParams)}}>{tab.label}</button>
        ))}
        </div>
        {/* tab content */}
        <div className='px-5 pt-5'>
            {activeTab === 'pending' && (
                <div>
                   <div className='overflow-x-auto'>
                        <table className='min-w-full bg-white border border-gray-200/40'>
                            <thead>
                                <tr className="bg-gray-100/40 text-[#C3C3C3] font-semibold text-xs">
                                    <th className="py-4 px-4 text-left border-b">S/N</th>
                                    <th className="py-4 px-4 text-left border-b">Content</th>
                                    <th className="py-4 px-4 text-left border-b">Category</th>
                                    {/* <th className="py-4 px-4 text-left border-b">Sub-Category</th> */}
                                    <th className="py-4 px-4 text-left border-b">Amount</th>
                                    <th className="py-4 px-4 text-left border-b">Upload Date</th>
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
                                filteredData.map((item, index) => {
                                    return (
                                        <tr key={item.id} className='hover:bg-gray-50 text-[#333333] font-normal text-xs'>
                                            <td className='py-2 px-4 border-b'>{index + 1}</td>
                                            <td className='py-3 px-4 border-b'>{item.title}</td>
                                            <td className='py-3 px-4 border-b'>{item?.meta?.category}</td>
                                            <td className='py-3 px-4 border-b'>{ item.pricing?.toLocaleString()}</td>
                                            <td className='py-3 px-4 border-b'>{new Date(item?.updated_at).toLocaleDateString()}</td>
                                            <td className='py-3 px-4 border-b flex items-center text-[#FFC107] text-xs'><PiRadioButtonFill />{item?.status }</td>
                                            <td className='py-2 px-4 border-b relative'>
                                                 <BsThreeDotsVertical onClick={ () => toggleMenu(item.id)}  className='cursor-pointer'/>
                                                {viewMoreBtn === item.id && (
                                                    <div className="absolute right-5 mt-2 w-40 bg-white shadow-lg rounded-lg z-10 text-[#333333]"> 
                                                        <ul className="p-2 text-xs">
                                                            <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                                                                <button onClick={() => handleModalDetails(item)}>View Details</button>
                                                            </li>
                                                            <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Approve</li>
                                                            <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Decline</li> 
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
                        {/* next and previous btn */}
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
                        {/* open modal */}
                        <div>
                            {modal && (
                                <PendingModal item={selectedItem} onClose={handleCloseModal}/>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'approved' && (
                <div>
                <div className='overflow-x-auto'>
                     <table className='min-w-full bg-white border border-gray-200/40'>
                         <thead>
                             <tr className="bg-gray-100/40 text-[#C3C3C3] font-semibold text-xs">
                                 <th className="py-4 px-4 text-left border-b">S/N</th>
                                 <th className="py-4 px-4 text-left border-b">Content</th>
                                 <th className="py-4 px-4 text-left border-b">Category</th>
                                 <th className="py-4 px-4 text-left border-b">Amount</th>
                                 <th className="py-4 px-4 text-left border-b">Upload Date</th>
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
                             filteredData.map((item, index) => {
                                 return (
                                     <tr key={item.id} className='hover:bg-gray-50 text-[#333333] font-normal text-xs'>
                                         <td className='py-2 px-4 border-b'>{index + 1}</td>
                                         <td className='py-3 px-4 border-b'>{item.title}</td>
                                         <td className='py-3 px-4 border-b'>{item?.meta?.category}</td>
                                         <td className='py-3 px-4 border-b flex items-center'><TbCurrencyNaira />{item.pricing?.toLocaleString()}</td>
                                         <td className='py-3 px-4 border-b'>{new Date(item?.updated_at).toLocaleDateString()}</td>
                                         <td className='py-3 px-4 border-b flex items-center text-green-500 text-xs'><PiRadioButtonFill />{item?.status }</td>
                                         <td className='py-2 px-4 border-b relative'>
                                              <BsThreeDotsVertical onClick={ () => toggleMenu(item.id)}  className='cursor-pointer'/>
                                             {viewMoreBtn === item.id && (
                                                <>
                                                    <div className="absolute right-5 mt-2 w-40 bg-white shadow-lg rounded-lg z-10 text-[#333333]"> 
                                                        <ul className="p-2 text-xs">
                                                            <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                                                                <button onClick={() => handleModalDetails(item)}>View Details</button>
                                                            </li>
                                                            <li onClick={() => {handleStatusChange(item?.id, 'Declined');}} className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Decline</li>
                                                        </ul>
                                                    </div>
                                                    {/* decline modal */}
                                                    {declineModal && (
                                                        <div className='fixed inset-0 transition-all flex items-center justify-center bg-black bg-opacity-50 z-[99]'>
                                                            <div className='bg-white rounded-lg shadow-lg w-1/3 h-[350px] p-6 relative '>
                                                                <IoCloseCircleOutline onClick={ () => setDeclineModal(false)} size={30} className='absolute right-4 text-[#B0B0B0] cursor-pointer' />
                                                                <div className='flex flex-col h-full justify-around items-center py-10'>
                                                                    <p className='pb-5 font-bold text-[#333333] text-2xl'>Decline Request</p>
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
                                                                                setActiveTab("approved"); 
                                                                                handleFetch("Approved")
                                                                            }}
                                                                            className='bg-[#B00712] text-white p-3 px-10 rounded-lg'
                                                                            >
                                                                                Decline
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )} 
                                                </>
                                             )}
                                         </td>
                                     </tr>
                                 )
                             })
                         }
                         </tbody>
                     </table>
                     {/* next and previous btn */}
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
                     {/* open modal */}
                     <div>
                         {modal && (
                             <ApprovedModal item={selectedItem} onClose={handleCloseModal}/>
                         )}
                     </div>
                 </div>
                </div>
            )}
            {activeTab === 'declined' && (
                <div>
                    <div className='overflow-x-auto'>
                     <table className='min-w-full bg-white border border-gray-200/40'>
                         <thead>
                             <tr className="bg-gray-100/40 text-[#C3C3C3] font-semibold text-xs">
                                 <th className="py-4 px-4 text-left border-b">S/N</th>
                                 <th className="py-4 px-4 text-left border-b">Content</th>
                                 <th className="py-4 px-4 text-left border-b">Category</th>
                                 {/* <th className="py-4 px-4 text-left border-b">Sub-Category</th> */}
                                 <th className="py-4 px-4 text-left border-b">Amount</th>
                                 <th className="py-4 px-4 text-left border-b">Upload Date</th>
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
                             filteredData.map((item, index) => {
                                 return (
                                     <tr key={item.id} className='hover:bg-gray-50 text-[#333333] font-normal text-xs'>
                                         <td className='py-2 px-4 border-b'>{index + 1}</td>
                                         <td className='py-3 px-4 border-b'>{item.title}</td>
                                         <td className='py-3 px-4 border-b'>{item?.meta?.category}</td>
                                         <td className='py-3 px-4 border-b flex items-center'> <TbCurrencyNaira />{item.pricing?.toLocaleString()}</td>
                                         <td className='py-3 px-4 border-b'>{new Date(item?.updated_at).toLocaleDateString()}</td>
                                         <td className='py-3 px-4 border-b flex items-center text-red-500 text-xs'><PiRadioButtonFill />{item?.status }</td>
                                         <td className='py-2 px-4 border-b relative'>
                                              <BsThreeDotsVertical onClick={ () => toggleMenu(item.id)}  className='cursor-pointer'/>
                                             {viewMoreBtn === item.id && (
                                                 <div className="absolute right-5 mt-2 w-40 bg-white shadow-lg rounded-lg z-10 text-[#333333]"> 
                                                     <ul className="p-2 text-xs">
                                                         <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                                                             <button onClick={() => handleModalDetails(item)}>View Details</button>
                                                         </li>
                                                         <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={() => {handleStatusChange(item?.id, 'Approved');}}>Approve</li> 
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
                     {/* next and previous btn */}
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
                     {/* open modal */}
                     <div>
                         {modal && (
                             <DeclineModal item={selectedItem} onClose={handleCloseModal}/>
                         )}
                     </div>
                     
                     {/* done notification */}
                    <div>
                        {
                            notify && (
                                <div className='fixed inset-0 transition-all flex items-center justify-center bg-black bg-opacity-50 z-[99]'>
                                    <div className='bg-white rounded-lg shadow-lg w-1/4 h-[350px] p-6 relative flex justify-center items-'>
                                        <ul className='text-center flex flex-col justify-around'>
                                            <li><Image src={successIcon} alt='image'  /></li>
                                            <li>Approved</li>
                                            <li>
                                                <button 
                                                    onClick={
                                                        () => {
                                                            handleNotify();
                                                            setActiveTab("declined"); handleFetch("Declined")
                                                        }} 
                                                        className='bg-[#2F4858] text-white p-4 w-full rounded'
                                                        >
                                                    Done
                                                </button>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            )
                        }
                    </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default Page