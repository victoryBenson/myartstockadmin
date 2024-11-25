'use client'
import { useEffect } from 'react';
import { RootState } from '@/redux/store';
import { redirect } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';



const useAuthRedirect = () => {
    const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
    

    useEffect(() => {
        if (!isAuthenticated) {
            redirect('/login')
        }
    }, [isAuthenticated]);

    return isAuthenticated;
};

export default useAuthRedirect;
