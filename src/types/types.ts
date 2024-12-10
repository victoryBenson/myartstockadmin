
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
export interface item {
    id: number,
        category: string,
        type: string,
        quantity: string,
        purchase_price: string,
        status: string,
        deliverable?: {
            title: string,
            slug: string,
            description?: string
        },
        assigned_to?: {
            name?: string,
            personnel_name?: string,
            type?: string
        }
}
export interface OrderProps { 
    sku?: string,
    status?: string,
    total_amount?: number,
    date_assigned?: string,
    due_date?: string,
    id: number,
    created_at: string,
    payment_type?: string,
    items?: item[],
    customer?: {
        id: number,
        first_name?: string,
        last_name?: string,
        email?: string,
        phone_number?: string
    }
}


export interface OrderState {
    isLoading: boolean,
    isError?: boolean,
    orders: OrderProps[],
    orderDetail: OrderProps | null
    errorMsg?: string,
}

// asset management
export interface AssetProps {
    id: number,
    category_id?: string,
    title?: string,
    slug?: string,
    description?: string,
    status?: string,
    reason?: string,
    updated_at: string,
    pricing?: string,
    meta?: {
        author?: {
            id: number,
            first_name?: string,
            last_name?: string,
            profile_image?: string
        },
        category: string,
        asset_type?: string,
        images?: {
            id?: number,
            public_url: string,
            cover_image: string,
            private_url?: string
        },
        tags?: {
            id?: number,
            name?: string
        },
        revenue?: {
            total_units?: string,
            total_amount?: string
        }
    }
}

export interface AssetState {
    isLoading: boolean,
    isError?: boolean,
    assets: AssetProps[],
    assetsDetail: AssetProps | null
    errorMsg?: string,
}

