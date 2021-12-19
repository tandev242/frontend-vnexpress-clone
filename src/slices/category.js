import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryApi from "../apis/categoryApi";

export const loginUser = createAsyncThunk("auth/login", async (user) => {
    const response = await categoryApi.login(user);
    return response;
});

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    user: {},
    error: null,
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.isLoading = true;
        },
        [loginUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = action.error;
        },
    },
});

export default categorySlice.reducer;