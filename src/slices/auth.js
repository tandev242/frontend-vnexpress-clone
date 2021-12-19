import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../apis/authApi";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

export const loginUser = createAsyncThunk("auth/login", async (user) => {
    const response = await authApi.login(user);
    return response;
});

export const registerUser = createAsyncThunk("auth/register", async (user) => {
    const response = await authApi.register(user);
    return response;
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
    const response = await authApi.register();
    return response;
});

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    user: {},
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
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
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.data.user;
            localStorage.setItem("token", state.token);
        },
        [registerUser.pending]: (state) => {
            state.isLoading = true;
        },
        [registerUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.data.user;
            localStorage.setItem("token", state.token);
        }
    },
});

export default authSlice.reducer;