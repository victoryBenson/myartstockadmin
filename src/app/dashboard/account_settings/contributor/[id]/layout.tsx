'use client'
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";
import profileImage from '../../../../../../public/assets/profile-image.png'
import icon1 from '../../../../../../public/assets/410.png'
import icon2 from '../../../../../../public/assets/Mask group.png'
import { TbCurrencyNaira } from "react-icons/tb";
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getSingleContributor } from '@/redux/features/contributor/contributorSlice';



const ContributorDetailsLayout = ({children, params}: {children: React.ReactNode; params: Promise<{ id: string }>}) => {
    const { id } = React.use(params)
    const pathname = usePathname();
    const {isLoading, isError, errorMsg, singleContributor} = useAppSelector(state => state.contributor)
    const dispatch = useAppDispatch()
    const router = useRouter();

    
  useEffect(() => {
    dispatch(getSingleContributor(id));
  }, [dispatch, id]);


  if(isLoading){
    return <p>Loading...</p>
  }

  if(isError){
    return <p>{errorMsg}</p>
  }


  if (!singleContributor) {
    return <div>Vendor not found!</div>;
  }

  const tabs =[
    {name: "All Content", path: `/dashboard/account_settings/contributor/${id}/contents`},
    {name: "Transaction History", path: `/dashboard/account_settings/contributor/${id}/transactions`},
    {name: "Activity Log", path: `/dashboard/account_settings/contributor/${id}/activity`}
]


  const activeTab  = (path: string) => pathname === path;

  return (
    <div className='p-4'>
        <div className="flex items-center text-[#6D6D6D] text-sm"><MdArrowBackIosNew /> <span onClick={() => router.push('/dashboard/account_settings/contributor')} className="text-blue-600 cursor-pointer">Vendor Management</span>/{singleContributor?.personnel_name}</div>
        <div className="flex justify-between pt-10">
            <div className="flex gap-2">
                <span>
                    <Image src={profileImage} alt={'image'} width={90} height={80} className="rounded"/>
                </span>
                <div className="flex flex-col gap-8">
                    <ul className="space-y-2">
                        <li className="font-bold text-[#151515] text-2xl">{singleContributor?.personnel_name}</li>
                        <li className="font-bold text-red-500 text-sm">{singleContributor?.type}</li>
                    </ul>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <ul className="flex gap-8 justify-between bg-[#F9FCFF] border w-[217px] h-[84px] p-2 rounded-lg">
                    <li className="flex flex-col text-[#2F4858] text-2xl">
                        <span className="text-[#656565] text-sm">Completed Order</span>
                        {singleContributor?.total_content_download || 0}
                    </li>
                    <li>
                        <Image src={icon1} alt="icon1" width={40} quality={100}/>
                    </li>
                </ul>
                <ul className="flex gap-8 justify-between bg-[#92FF8840] text-[#1F7617] border w-[217px] h-[84px] p-2 rounded-lg">
                    <li className="flex flex-col text-[#2F4858] text-2xl">
                        <span className="text-[#656565] text-sm">Processed Order</span>
                        {singleContributor?.total_content_download || 0}
                    </li>
                    <li>
                        <Image src={icon1} alt="icon1" width={40} quality={100}/>
                    </li>
                </ul>
                <ul className="flex gap-8 justify-between bg-[#F9FCFF] border w-[217px] h-[84px] p-2 rounded-lg">
                    <li className="flex flex-col text-[#2F4858] text-2xl">
                        <span className="text-[#656565] text-sm">Pending Order</span>
                        {singleContributor?.total_content_download || 0}
                    </li>
                    <li>
                        <Image src={icon1} alt="icon1" width={40} quality={100}/>
                    </li>
                </ul>
                <ul className="flex gap-8 justify-between bg-[#FD9F9F40] text-[#F42727] border w-[217px] h-[84px] p-2 rounded-lg">
                    <li className="flex flex-col text-[#2F4858] text-2xl">
                        <span className="text-[#656565] text-sm">Wallet Order</span>
                        <span className="flex items-center">
                            <TbCurrencyNaira className="text-[#656565]" />
                            {singleContributor.orders?.total_amount_spent || 0}
                        </span>
                    </li>
                    <li>
                        <Image src={icon2} alt="icon1" width={40} quality={100}/>
                    </li>
                </ul>
            </div>
        </div>

        <div>
            <p className="py-2 pt-10 font-bold text-base text-[#C6C6C6] uppercase border-b">More Info</p>
        <div className="flex gap-4 pt-6 border-b">
            {/* sub-menu */}
            { tabs.map(tab => (
                <Link key={tab.name} href={tab.path} className={`pt-5 pb-1 gap-4 ${activeTab(tab.path)? 'underline decoration-4 decoration-red-500 underline-offset-8 text-black' : "text-[#B0B0B0]"}`}>{tab.name}</Link>
            ))}
        </div>
        <main className='pt-2'>{children}</main>
        </div>
    </div>
  )
}

export default ContributorDetailsLayout