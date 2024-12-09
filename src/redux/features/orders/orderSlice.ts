import {OrderProps, OrderState } from '../../../types/types';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import orderService from './orderService';



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
    async(_, thunkAPI) => {
        try {
            return await orderService.fetchOrders()
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

    }
})


export default orderSlice.reducer