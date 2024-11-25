import { AuthState } from '../../../types/types';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import authService from './authServices';


const token = localStorage.getItem("token");

const initialState: AuthState = {
    isLoading: false,
    isError: false,
    token: null,
    isAuthenticated: !!token,
    errorMsg: ""
};


//loginUser
export const loginUser = createAsyncThunk(
    'auth/login',
    async(userData, thunkAPI) => {
        try {
            return await authService.login(userData)
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // ResetState: (state) => {
        //     state.isError = false;
        //     state.isAuthenticated = false;
        //     state.isError = false;
        //     state.user = []
        // },
        loadToken: (state) => {
            const token = localStorage.getItem("token");
            if (token) {
              state.token = token;
              state.isAuthenticated = true;
            }
          },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.isError = false;
            state.errorMsg = "";
            localStorage.removeItem("token");
          },
    },
    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(loginUser.fulfilled, (state, {payload}:PayloadAction<string>) => {
            state.token = payload;
            state.isAuthenticated = true;
            state.isLoading = false;
            localStorage.setItem("token", payload);
            console.log(payload)
            console.log(`${state.token}`)
        })
        .addCase(loginUser.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.isAuthenticated = false
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })
    }
})


export const {logout, loadToken} = authSlice.actions;
export default authSlice.reducer