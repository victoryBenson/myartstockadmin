'use client'
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState } from 'react'
import Logo from '@/shared/Logo';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginUser } from '@/redux/features/auth/authSlice';
import { redirect } from 'next/navigation';
import { LuEye, LuEyeOff } from 'react-icons/lu';




const initialState = {
    email: "",
    password: "",
    confirmPassword: ""
};


const images = [
    "/assets/slide_1.jpg",
    "/assets/slide_2.jpg",
    "/assets/slide_3.jpg",
    "/assets/slide_4.jpg",
]

const ResetPassword = () => {
    const [formState, setFormState] = useState(initialState);
    const dispatch = useAppDispatch()
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewPwd, setViewPwd] = useState<boolean>(false);
    const [viewConfirmPwd, setViewConfirmPwd] = useState<boolean>(false)
    const {isLoading, isError, errorMsg} = useAppSelector((state)=> state.auth);


    // Slideshow effect
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000);
      return () => clearInterval(interval);
    }, []);
   

    const togglePwd = () => {
        setViewPwd(!viewPwd)    
     };


     const toggleConfirmPwd = () => {
        setViewConfirmPwd(!viewConfirmPwd)
     };

     const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormState({...formState, [name]: value})
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser(formState)).unwrap()  
        redirect('/dashboard')  
    };

  return (
    <div className='flex min-h-screen fixed inset-0'>
        <div className='w-1/2 p-5'>
            <div>
                <Link href={`/`}>
                    <Logo/>
                </Link>
            </div>
            <div className='flex flex-col items-center'>
                <p className='font-bold text-center text-3xl pt-14 pb-5'>Create new Password</p>
                <p className='font-normal text-center text-base py-2 pb-10 text-[#3D3D3D] w-3/4'>Your new password must be different from previously used password</p>
                <p className='text-red-600'>{isError && errorMsg}</p>
                <form className='w-full md:w-2/3 lg:w-3/4 flex flex-col justify-center' onSubmit={handleSubmit}>
                    <div className="flex flex-col p-3 relative">
                        <label htmlFor="password" className="text-base font-semibold">New Password</label>
                        <input 
                            type={viewPwd? "text" : "password"} 
                            className='p-3 rounded w-full outline-gray-100 border border-gray-100' 
                            placeholder="New Password"
                            name="password"
                            value={formState.password}
                            onChange={handleChange}
                            required
                        />
                        <span onClick={togglePwd} className='absolute top-[54%] right-10 text-brown transition-transform  duration-300 cursor-pointer text-darkGray'>{viewPwd? <LuEye /> : <LuEyeOff/>}</span>
                    </div>
                    <div className="flex flex-col p-3 relative">
                        <label htmlFor="password" className="text-base font-semibold">Confirm Password</label>
                        <input 
                            type={viewConfirmPwd? "text" : "password"} 
                            className='p-3 rounded w-full outline-gray-100 border border-gray-100' 
                            placeholder="Confirm New Password"
                            name="confirmPassword"
                            value={formState.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <span onClick={toggleConfirmPwd} className='absolute top-[54%] right-10 text-brown transition-transform  duration-300 cursor-pointer text-darkGray'>{viewConfirmPwd? <LuEye /> : <LuEyeOff/>}</span>
                    </div>
                    <div className='bg-[#B00712] m-3 text-white rounded'>
                        <button type="submit" className='w-full p-3 font-bold'>{isLoading? 'Loading...' : 'Reset Password'}</button>
                    </div>
                </form>
            </div>
        </div>
        <div className='w-1/2 relative overflow-hidden'>
            <div
                className="absolute inset-0 bg-cover transition-all duration-1000"
                style={{
                    backgroundImage: `url(${images[currentIndex]})`,
                }}
                ></div>
        </div>
    </div>
  )
}

export default ResetPassword;
