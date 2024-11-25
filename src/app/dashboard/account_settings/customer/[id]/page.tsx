'use client'
import { getSingleUser } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";
import profileImage from '../../../../../../public/assets/profile-image.png'
import icon1 from '../../../../../../public/assets/410.png'
import icon2 from '../../../../../../public/assets/Mask group.png'
import { TbCurrencyNaira } from "react-icons/tb";
import { fetchRegisteredUsers } from '@/redux/features/user/userSlice'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Loader from "@/shared/Loader";
import { RootState } from "@/redux/store";



const UserDetails = ({params}: {params: Promise<{ id: number }>;}) => {
    const {isLoading, isError, errorMsg, singleUser} = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()
    const { id } = React.use(params)
    const router = useRouter();



    useEffect(() => {
        dispatch(fetchRegisteredUsers())
        dispatch(getSingleUser(id));
    },[dispatch, id])   
   

    if(isLoading){
        return <Loader/>
    }

    if(isError){
        return <p>{errorMsg}</p>
    }


    if (!singleUser) {
        return <div>User not found!</div>;
    }

  
  return (
    <div className="p-4">
        <div className="flex items-center text-[#6D6D6D] text-sm"><MdArrowBackIosNew /> <span onClick={() => router.back()} className="text-blue-600 cursor-pointer">Customer Management</span>/{singleUser?.first_name}</div>
        <div className="flex justify-between pt-10">
            <div className="flex gap-2">
                <span>
                    <Image src={profileImage} alt={'image'} width={90} height={80} className="rounded"/>
                </span>
                <div className="flex flex-col gap-8">
                    <ul className="space-y-2">
                        <li className="font-bold text-[#151515] text-2xl">{singleUser?.first_name} {singleUser?.last_name}</li>
                        <li>{singleUser.is_active === true? <span className='bg-[#06D6A00D] rounded-lg px-2 py-1 text-sm text-[#2F4858]'>Active</span> : <span className='bg-[#F99E0B40] text-orange rounded-lg px-2 py-1 text-sm text-[#F99E0B]'>In-Active</span> }</li>
                        {/* <li className="text-[#B1B1B1] font-semibold text-xs">Referral Code: </li> */}
                    </ul>
                    <ul className="space-y-4 text-[#151515]">
                        <li className="uppercase text-[#8F8F8F] font-bold">Contact information</li>
                        <li className="flex items-center">
                            <span>Phone: </span> 
                            <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{singleUser.phone_number ? singleUser.phone_number : "null"}</span>
                        </li>
                        <li className="flex items-center">
                            <span>Email Address: </span>
                            <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{singleUser.email}</span>
                        </li>
                        <li className="">Country:
                            <span className="font-extrabold text-sm pl-5 text-[#2F4858]">null</span>
                        </li>
                        <li>
                            <span>Residential Address:</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <span><button className="bg-[#BCBCBC80] text-[#6D6D6D] rounded p-3">Disorder User</button></span>
                <ul className="space-y-4">
                    <li className="uppercase text-[#8F8F8F] font-bold">Basic information</li>
                    <li className="flex items-center">
                        <span>Gender:</span> 
                        <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{singleUser.gender ? singleUser.phone_number : "null"}</span>
                    </li>
                    <li className="flex items-center">
                        <span>Date of birth: </span>
                    </li>
                </ul>
            </div>
            <div className="bg-[#F9FCFF] w-[300px] h-[200px] p-4 rounded border flex flex-col justify-around">
                <ul className="flex gap-8 justify-between">
                    <li className="flex flex-col text-[#2F4858] text-2xl">
                        <span className="text-[#656565] text-sm">Total Content Download</span>
                        {singleUser.orders?.total_content_download}
                    </li>
                    <li>
                        <Image src={icon1} alt="icon1" width={40} quality={100}/>
                    </li>
                </ul>
                <span className="border"></span>
                <ul className="flex gap-8 justify-between">
                    <li className="flex flex-col text-[#2F4858] text-2xl">
                        <span className="text-[#656565] text-sm">Amount Spent</span>
                        <span className="flex items-center">
                            <TbCurrencyNaira className="text-[#656565]" />
                            {singleUser.orders?.total_amount_spent}
                        </span>
                    </li>
                    <li>
                        <Image src={icon2} alt="icon1" width={40} quality={100}/>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <p className="py-6 font-bold text-base text-[#333333]">Order History</p>
            <p className="">No record found!</p>
        </div>
    </div>
  );
};

export default UserDetails;
