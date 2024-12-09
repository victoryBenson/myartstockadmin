import {AssetProps, AssetState } from '../../../types/types';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import assetService from './assetService';
import axiosInstance from '@/utils/utils';



const initialState: AssetState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    assets: [],
    assetsDetail: null
};


//fetchAsset
export const FetchAssets = createAsyncThunk(
    'assets/fetchAssets',
    async(query: string, thunkAPI) => {
        try {
            return await assetService.fetchAssets(query)
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);

//fetchAssetDetails
export const AssetDetails = createAsyncThunk(
    'asset/assetDetails',
    async(id: number, thunkAPI) => {
        try {
            return await assetService.assetDetails(id)
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);


//update_status
export const updateStatus = createAsyncThunk(
    'asset/updateStatus',
    async({ id, status, reason}: { id: number; status: string, reason?: string}, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`/admin/assets/${id}/update-status`, {status, reason})
            console.log(response.data.data)
            return response.data.data
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);



const assetSlice = createSlice({
    name: "assets",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
        // fetchAssets
        .addCase(FetchAssets.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(FetchAssets.fulfilled, (state, {payload}:PayloadAction<AssetProps[]>) => {
            state.isLoading = false;
            state.assets = payload;
            console.log(payload)
        })
        .addCase(FetchAssets.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })


        // fetchAssetDetails
        .addCase(AssetDetails.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(AssetDetails.fulfilled, (state, {payload}:PayloadAction<AssetProps>) => {
            state.isLoading = false;
            state.assetsDetail = payload;
            console.log(payload)
        })
        .addCase(AssetDetails.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })


         // update status
         .addCase(updateStatus.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(updateStatus.fulfilled, (state, {payload}:PayloadAction<AssetProps>) => {
            state.isLoading = false;
            const item = state.assets.find((item) => item.id === payload.id);
            if (item) {
            item.status = payload.status;
            }
            console.log(item?.status)
        })
        .addCase(updateStatus.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })

    }
})


export default assetSlice.reducer;