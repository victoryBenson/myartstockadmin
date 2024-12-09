'use client'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";
import React, { useEffect } from 'react'
import Loader from "@/shared/Loader";
import { RootState } from "@/redux/store";
import { OrderDetails } from "@/redux/features/orders/orderSlice";
import { TbCurrencyNaira } from "react-icons/tb";



const Page = ({params}: {params: Promise<{ id: number }>}) => {
    const {isLoading, isError, errorMsg, orderDetail: data} = useAppSelector((state: RootState) => state.order)
    const dispatch = useAppDispatch()
    const { id } = React.use(params)
    const router = useRouter();



    useEffect(() => {
        dispatch(OrderDetails(id));
    },[dispatch, id])   
   

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
        <div className="flex items-center text-[#6D6D6D] text-sm"><MdArrowBackIosNew /> <span onClick={() => router.back()} className="text-blue-600 cursor-pointer">Order Management</span></div>
        <ul className="py-5 space-y-2">
            <li className="text-lg font-bold">Order Details</li>
            <li className="text-xs text-[#3D3D3D]">
                <span>Order Number <b>{data.sku}</b> </span>
                {/* <span>{new Date(data.updated_at).toLocaleDateString('default', { day: "2-digit", month:"long", year:"numeric" })}</span> */}
            </li>
        </ul>
        <div className="flex gap-8">
            <div className="w-1/2 border rounded">image file</div>
            <ul className="w-1/2 p-5 space-y-5">
                <li className="flex justify-between">
                    <p className="flex flex-col">
                        <span className="font-bold text-2xl">Product name</span>
                        <span className="text-sm">By: null</span>
                    </p>
                    <p className="flex items-center text-base"><TbCurrencyNaira />{data.total_amount}</p>
                </li>
                <li className="text-sm flex flex-col">
                    <span>category: Frame</span>
                    <span>Sub-Category: null</span>
                </li>
                <li className="italic text-gray-400">Product description....</li>
            </ul>
        </div>
    </div>
  );
};

export default Page;
