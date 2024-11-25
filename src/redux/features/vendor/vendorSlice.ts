import { VendorProps, VendorState } from '../../../types/types';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import vendorService from './vendorService';



const initialState: VendorState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    vendors: [],
    singleVendor: []
};


//fetchVendors
export const fetchVendors = createAsyncThunk(
    'vendors/fetchVendors',
    async(_, thunkAPI) => {
        try {
            return await vendorService.fetchAllVendors()
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);

// getSingleVendor
export const getSingleVendor = createAsyncThunk(
    'vendor/getSingleVendor',
    async(userId, thunkAPI) => {
        try {
            return await vendorService.getSingleVendor(userId)
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);


const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
        // fetchAllVendors
        .addCase(fetchVendors.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(fetchVendors.fulfilled, (state, {payload}:PayloadAction<VendorProps[]>) => {
            state.isLoading = false;
            state.vendors = payload;
            console.log(payload)
        })
        .addCase(fetchVendors.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })

        //getSingleVendor
         .addCase(getSingleVendor.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getSingleVendor.fulfilled, (state, {payload}:PayloadAction<VendorProps[]>) => {
            state.isLoading = false;
            state.singleVendor = payload;
            console.log(state.singleVendor)
        })
        .addCase(getSingleVendor.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string
            console.log(state.errorMsg)
        })

    }
})


export default vendorSlice.reducer