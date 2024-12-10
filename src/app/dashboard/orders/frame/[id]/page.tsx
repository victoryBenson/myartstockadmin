/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";
import React, { useEffect, useState } from 'react'
import Loader from "@/shared/Loader";
import { RootState } from "@/redux/store";
import { OrderDetails } from "@/redux/features/orders/orderSlice";
import { TbCurrencyNaira } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import OrderDetailsModal from "@/components/order/OrderDetailsModal";
import AssignVendorModal from "@/components/order/AssignVendorModal";
// import UpdateStatus from "@/components/order/UpdateStatus";




const Page = ({params}: {params: Promise<{ id: number }>}) => {
    const {isLoading, isError, errorMsg, orderDetail: data} = useAppSelector((state: RootState) => state.order)
    const dispatch = useAppDispatch()
    const { id } = React.use(params)
    const router = useRouter();
    const [viewMoreBtn, setViewMoreBtn] = useState<number | null>(null);
    const [viewDetails, setViewDetails] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Record<string, any> | null>(null);
    const [assignVendorModal, setAssignVendorModal] = useState(false)
    // const [updateStatusModal, setUpdateStatusModal] = useState(false);
   


    useEffect(() => {
        dispatch(OrderDetails(id));
    },[dispatch, id])   
   
    const toggleMenu = (id: number) => {
        setViewMoreBtn(viewMoreBtn === id ? null : id);
    };

    const handleViewDetail = (param: Record<string, any>) =>{
        setSelectedItem(param)
        setViewDetails(true)
    };

    const handleCloseOrderModal = () => {
        setViewDetails(false);
        setSelectedItem(null);
    };

     const handleAssignModal = (param: Record<string, any>) =>{
        setSelectedItem(param)
        setAssignVendorModal(true)
    };

    const handleCloseAssignModal = () => {
        setAssignVendorModal(false);
        setSelectedItem(null);
    };


    // const handleStatusUpdate = (param: Record<string, any>) =>{
    //     setSelectedItem(param)
    //     setUpdateStatusModal(true)
    // };

    // const handleCloseStatusModal = () => {
    //     setUpdateStatusModal(false);
    //     setSelectedItem(null);
    // };

    if(isLoading){
        return <Loader/>
    }

    if(isError){
        return <p>{errorMsg}</p>
    }


    if (!data) {
        return <div>Order not found!</div>;
    }

  
  return (
    <div className="p-4">
        <div className="flex items-center text-[#6D6D6D] text-sm cursor-pointer" onClick={() => router.back()}><MdArrowBackIosNew /> <span className="text-blue-600 cursor-pointer">Order Management</span></div>
        <ul className="py-5 space-y-2">
            <li className="text-lg font-bold">Order Details</li>
            <li className="text-xs text-[#3D3D3D]">
                <span>Order Number <b>{data.sku}</b> </span>
                {/* <span>{new Date(data.updated_at).toLocaleDateString('default', { day: "2-digit", month:"long", year:"numeric" })}</span> */}
            </li>
        </ul>
        <div>
            <p className="text-sm font-bold text-[#C6C6C6]">Details</p>
            <ul className="flex gap-8 text-sm py-3 items-start">
                <li className="flex items-center">Name: {" "} <b className="text-[#2F4858]"> {data.customer?.first_name} {""}{ data.customer?.last_name}</b></li>
                <li className="flex flex-col gap-2">
                    <span>Payment Type: {data.payment_type ?? "null"}</span>
                    <span className="flex items-center">Total Price: <b className="text-[#5420A4] flex items-center"><TbCurrencyNaira />{data.total_amount}</b></span>
                    <span className="flex items-center">Email Address: {""} <b className="flex items-center text-[#2F4858]">{" "} {data.customer?.email}</b></span>
                </li>
            </ul>
        </div>
        <div>
            <p className="text-sm font-bold text-[#C6C6C6]">Delivery Details</p>
            <ul className="flex gap-8 text-sm py-3 items-start">
                <li className="flex items-center">Delivery Address: {" "} <b className="text-[#2F4858]"> {data.customer?.first_name} {""}{ data.customer?.last_name}</b></li>
                <li className="flex flex-col gap-2">
                    <span className="flex items-center">Phone: <b className="text-[#5420A4] flex items-center"><TbCurrencyNaira />{data.total_amount}</b></span>
                    <span className="flex items-center">Email Address: {""} <b className="flex items-center text-[#2F4858]">{" "} {data.customer?.email}</b></span>
                </li>
            </ul>
        </div>
        <div className="py-3">
            <p className="text-sm font-bold text-[#C6C6C6]">Order Status</p>
            <p className="text-sm">Order placed on {new Date(data?.created_at).toLocaleDateString()}</p>
            
        </div>
        {/* table data */}
        <table className='min-w-full bg-white border border-gray-200/40'>
            <thead>
                <tr className="bg-gray-100/40 text-[#998E8D] font-semibold text-xs">
                    <th className="py-4 px-4 text-left border-b">S/N</th>
                    <th className="py-4 px-4 text-left border-b">Product</th>
                    <th className="py-4 px-4 text-left border-b">Type</th>
                    <th className="py-4 px-4 text-left border-b">Quantity</th>
                    <th className="py-4 px-4 text-left border-b">Price</th>
                    <th className="py-4 px-4 text-left border-b">Vendor Assigned</th>
                    <th className="py-4 px-4 text-left border-b">Status</th>
                    <th className="py-4 px-4 text-left border-b">Action</th>
                </tr>
            </thead>
            <tbody>
                { !data && !isLoading?
                <tr className='py-5 flex justify-center items-center font-bold text-[#333333] relative'>
                    <td className='py-4 px-4 text-center'>No matching data found</td>
                </tr>
                : 
                data?.items?.map((item, index) => {
                    return (
                        <tr key={index} className='hover:bg-gray-50 text-[#333333] font-normal text-xs'>
                            <td className='py-2 px-4 border-b'>{index + 1}</td>
                            <td className='py-2 px-4 border-b flex items-center text-[#5420A4]'>{item.deliverable?.title}</td>
                            <td className='py-2 px-4 border-b'>{item.type ?? "null"}</td>
                            <td className='py-2 px-4 border-b text-[#5420A4]'>{item.quantity ?? "null"}</td>
                            <td className='py-2 px-4 border-b text-[#5420A4] flex items-center'><TbCurrencyNaira />{item.purchase_price ?? "null"}</td>
                            <td className='py-2 px-4 border-b '>{item.assigned_to?.personnel_name}</td>
                            <td className='py-2 px-4 border-b'>{item.status ?? "null"}</td>
                            <td className='py-2 px-4 border-b relative'>
                                <BsThreeDotsVertical onClick={ () => toggleMenu(item.id)}  className='cursor-pointer'/>
                                {viewMoreBtn === item.id && (
                                    <div className="absolute right-10 mt-2 w-40 bg-white shadow-lg rounded-lg z-10 text-[#333333] border">
                                        <ul className="p-2 text-xs">
                                            <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleViewDetail(item)}>View Detail</li>
                                            <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Update Status</li>
                                            {/* <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleStatusUpdate(item)}>Update Status</li> */}
                                            <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAssignModal(item)}>Assign to vendor</li>
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

        {/* view details */}
        {viewDetails && ( <OrderDetailsModal data={selectedItem} onClose={handleCloseOrderModal}/>)}

        {/* update order status modal */}
        {/* {updateStatusModal && (<UpdateStatus item={selectedItem} onClose={handleCloseStatusModal}/> )} */}

        {/* assign */}
        { assignVendorModal && (<AssignVendorModal item={selectedItem} onClose={handleCloseAssignModal}/>)}
    </div>
  );
};

export default Page;
