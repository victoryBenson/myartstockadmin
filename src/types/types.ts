export interface AuthState {
    token: string | null;
    isLoading: boolean,
    isError : boolean,
    isAuthenticated?: boolean;
    errorMsg: string
}


export interface UserState {
    id: number; 
    first_name: string;
    last_name:string;
    email: string;
    phone_number: string;
    gender: string;
    profile_image?: string;
    is_active?: boolean;
    orders: {
        total_content_download: number
        total_amount_spent: number
    };
}

export interface DataState {
    isLoading: boolean,
    isError?: boolean,
    users: UserState[],
    errorMsg?: string,
    singleUser: UserState | null
}


export interface VendorProps {
    id: number,
    name: string,
    email: string,
    phone_number?: string,
    country?: string,
    status?: string,
    personnel_name: string
    type?: string
    is_active?: boolean;
    orders?: {
        total_content_download: number
        total_amount_spent: number
    };
}

export interface VendorState {
    isLoading: boolean,
    isError?: boolean,
    vendors: VendorProps[],
    singleVendor: VendorProps | null,
    errorMsg?: string,
}


export interface ContributorProps {
    id: number,
    country?: string,
    status?: string,
    personnel_name?: string
    type?: string
    first_name: string;
    last_name:string;
    email: string;
    phone_number: string;
    gender: string;
    profile_image?: string;
    is_active?: boolean;
    orders?: {
        total_content_download: number
        total_amount_spent: number
    };
}

export interface ContributorState {
    isLoading: boolean,
    isError?: boolean,
    contributors: ContributorProps[],
    singleContributor: ContributorProps | null
    errorMsg?: string,
}


//orders
export interface OrderProps {
    email?: string,
    sku?: string,
    status?: string,
    description?: string,
    total_amount?: number,
    date_assigned?: string
}


export interface OrderState {
    isLoading: boolean,
    isError?: boolean,
    orders: OrderProps[],
    errorMsg?: string,
}
