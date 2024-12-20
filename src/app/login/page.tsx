'use client'
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { LuEye, LuEyeOff} from 'react-icons/lu';
import { RiCheckboxBlankLine } from 'react-icons/ri';
import Logo from '@/shared/Logo';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginUser } from '@/redux/features/auth/authSlice';
import { redirect } from 'next/navigation';



const initialState = {
    email: "",
    password: "",
};

const images = [
    "/assets/slide_1.jpg",
    "/assets/slide_2.jpg",
    "/assets/slide_3.jpg",
    "/assets/slide_4.jpg",
]

const Login = () => {
    const [viewPwd, setViewPwd] = useState<boolean>(false);
    const [formState, setFormState] = useState(initialState);
    const dispatch = useAppDispatch()
    const [currentIndex, setCurrentIndex] = useState(0);
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
                        <Link href={'forget_password'} className='text-[#B00712]'>Forget Password?</Link>
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

export default Login;
