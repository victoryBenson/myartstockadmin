import { ContributorProps, ContributorState } from '../../../types/types';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import contributorService from './contributorService';



const initialState: ContributorState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    contributors: [],
    singleContributor:  null
};


//fetchContributor
export const fetchContributor = createAsyncThunk(
    'contributor/fetchContributor',
    async(_, thunkAPI) => {
        try {
            return await contributorService.fetchAllContributors()
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);

// getSingleContributor
export const getSingleContributor = createAsyncThunk(
    'contributor/getSingleContributor',
    async(userId: number, thunkAPI) => {
        try {
            return await contributorService.getSingleContributor(userId)
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);


const contributorSlice = createSlice({
    name: "contributor",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
        // fetchAllContributors
        .addCase(fetchContributor.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(fetchContributor.fulfilled, (state, {payload}:PayloadAction<ContributorProps[]>) => {
            state.isLoading = false;
            state.contributors = payload;
            console.log(payload)
        })
        .addCase(fetchContributor.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })

        //getSingleContributor
         .addCase(getSingleContributor.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getSingleContributor.fulfilled, (state, {payload}:PayloadAction<ContributorProps>) => {
            state.isLoading = false;
            state.singleContributor = payload;
            console.log(state.singleContributor) 
        })
        .addCase(getSingleContributor.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string
            console.log(state.errorMsg)
        })

    }
})


export default contributorSlice.reducer