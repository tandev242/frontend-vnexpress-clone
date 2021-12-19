import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentApi from "../apis/commentApi";
import { createBrowserHistory } from "history";
export const loginUser = createAsyncThunk("auth/login", async (user) => {
    const response = await authApi.login(user);
    return response;
});

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    user: {},
    error: null,
};

export const commentSlice = createSlice({
    name: "comment",
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

export default commentSlice.reducer;