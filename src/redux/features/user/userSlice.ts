import { DataState, UserState } from '../../../types/types';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import userService from './userService';



const initialState: DataState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    users: [],
    singleUser: []
};


//fetchRegisteredUsers
export const fetchRegisteredUsers = createAsyncThunk(
    'user/fetchRegisteredUsers',
    async(_, thunkAPI) => {
        try {
            return await userService.fetchRegisteredUsers()
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);

// getSingleUser
export const getSingleUser = createAsyncThunk(
    'user/getSingleUser',
    async(userId, thunkAPI) => {
        try {
            return await userService.getSingleUser(userId)
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
        // getAllUsers
        .addCase(fetchRegisteredUsers.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(fetchRegisteredUsers.fulfilled, (state, {payload}:PayloadAction<UserState[]>) => {
            state.isLoading = false;
            state.users = payload;
            console.log(payload)
        })
        .addCase(fetchRegisteredUsers.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })

         // getSingleUser
        .addCase(getSingleUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getSingleUser.fulfilled, (state, {payload}:PayloadAction<UserState[]>) => {
            state.isLoading = false;
            state.singleUser = payload;
            console.log(state.singleUser)
        })
        .addCase(getSingleUser.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string
            console.log(state.errorMsg)
        })

    }
})


export default userSlice.reducer