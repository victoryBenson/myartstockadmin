import {OrderProps, OrderState } from '../../../types/types';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import orderService from './orderService';
import axiosInstance from '@/utils/utils';



const initialState: OrderState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    orders: [],
    orderDetail: null
};


//fetchRegisteredUsers
export const FetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async(param: string, thunkAPI) => {
        try {
            return await orderService.fetchOrders(param)
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);

//fetchRegisteredUsers
export const OrderDetails = createAsyncThunk(
    'orders/fetchOrderDetails',
    async(id: number, thunkAPI) => {
        try {
            return await orderService.orderDetails(id)
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
export const updateOrderStatus = createAsyncThunk(
    'orders/updateStatus',
    async({id, status}: { id: number; status: string}, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`/admin/orders/${id}/update-status`, {status})
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

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
        // fetchOrder
        .addCase(FetchOrders.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(FetchOrders.fulfilled, (state, {payload}:PayloadAction<OrderProps[]>) => {
            state.isLoading = false;
            state.orders = payload;
            console.log(payload)
        })
        .addCase(FetchOrders.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })


        // fetchOrderDetails
        .addCase(OrderDetails.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(OrderDetails.fulfilled, (state, {payload}:PayloadAction<OrderProps>) => {
            state.isLoading = false;
            state.orderDetail = payload;
            console.log(payload)
        })
        .addCase(OrderDetails.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })

        // update status
        .addCase(updateOrderStatus.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(updateOrderStatus.fulfilled, (state, {payload}:PayloadAction<OrderProps>) => {
            state.isLoading = false;
            const item = state.orders.find((item) => item.id === payload.id);
            if (item) {
            item.status = payload.status;
            }
            console.log(item?.status)
        })
        .addCase(updateOrderStatus.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })
    }
})


export default orderSlice.reducer