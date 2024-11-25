'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { LuEye, LuEyeOff} from 'react-icons/lu';
import { RiCheckboxBlankLine } from 'react-icons/ri';
import image from '../../../public/assets/authImage.png'
import image2 from '../../../public/assets/Frame 4.png'
import image3 from '../../../public/assets/Group 89452.png'
import Logo from '@/shared/Logo';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginUser } from '@/redux/features/auth/authSlice';
import { redirect } from 'next/navigation';



const initialState = {
    email: "",
    password: "",
};

const Login = () => {
    const [viewPwd, setViewPwd] = useState<boolean>(false);
    const [formState, setFormState] = useState(initialState);
    const dispatch = useAppDispatch()
    const {isLoading, isError, errorMsg} = useAppSelector((state)=> state.auth);


    const togglePwd = () => {
        setViewPwd(!viewPwd)    
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
    <div className='flex min-h-screen'>
        <div className='w-1/2 p-5'>
            <div>
                <Link href={`/`}>
                    <Logo/>
                </Link>
            </div>
            <div className='flex flex-col items-center'>
                <p className='font-bold text-center text-3xl py-14'>Login</p>
                <p className='text-red-600'>{isError && errorMsg}</p>
                <form className='w-full md:w-2/3 lg:w-3/4 flex flex-col justify-center' onSubmit={handleSubmit}>
                    <div className='flex flex-col p-3'>
                        <label htmlFor="username" className='font-bold py-2'>Enter Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder='Enter your email address'
                            className='p-3 rounded w-full outline-gray-100 border border-gray-100'
                            required
                            value={formState.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col p-3 relative">
                        <label htmlFor="password" className="text-base font-semibold">Password</label>
                        <input 
                            type={viewPwd? "text" : "password"} 
                            className='p-3 rounded w-full outline-gray-100 border border-gray-100' 
                            placeholder="Enter your password"
                            name="password"
                            value={formState.password}
                            onChange={handleChange}
                            required
                        />
                        <span onClick={togglePwd} className='absolute top-[54%] right-10 text-brown transition-transform  duration-300 cursor-pointer text-darkGray'>{viewPwd? <LuEye /> : <LuEyeOff/>}</span>
                    </div>
                    <div className='flex items-center justify-between p-3'>
                        <span className='flex items-center'><RiCheckboxBlankLine className='rounded-full'/>Remember me</span>
                        <Link href={'forget-password'} className='text-[#B00712]'>Forget Password?</Link>
                    </div>
                    <div className='bg-[#B00712] m-3 text-white rounded'>
                        <button type="submit" className='w-full p-3 font-bold'>{isLoading? 'Loading...' : 'LOGIN'}</button>
                    </div>
                    <div className=' flex justify-center items-center relative'>
                        <span className="text-base font-normal flex justify-center bg-white p-2">OR</span>
                        <span className='h-[2px] flex bg-[#D7C1C0]/40 absolute inset-0 w-full top-1/2 -z-10'></span>
                    </div>
                    <div>
                        <button className="hidden lg:flex w-full my-2 items-center justify-center p-3 rounded border border-lightGray/40 text-base gap-2 hover:shadow"><FcGoogle size={20}/>Sign up with Google</button>
                    </div>
                    <span className=" text-base py-3 text-center font-manrope">Don’t have account?<Link href={'register'} className="text-[#9147F0] px-2 hover:underline decoration-2 underline-offset-2">Register</Link></span>
                </form>
            </div>
        </div>
        <div className='border w-1/2 relative'>
            <Image src={image} alt='image' className='h-full w-full object-cover '/>
            <span className='absolute w-[246px] h-[60px] z-10 top-1/4 right-6'>
                 <Image src={image2} alt='image' className='h-full w-full object-cover rounded-full'/>
            </span>
            <span className='absolute w-[300px] h-[60px] z-10 top-[50%] left-6'>
                <Image src={image3} alt='image' className='h-full w-full object-contain'/>
            </span>
        </div>
    </div>
  )
}

export default Login;
