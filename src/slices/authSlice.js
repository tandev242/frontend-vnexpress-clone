import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../apis/authApi";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

export const login = createAsyncThunk("auth/login", async (user) => {
    const response = await authApi.login(user);
    return response;
});

export const register = createAsyncThunk("auth/register", async (user) => {
    const response = await authApi.register(user);
    return response;
});

export const logout = createAsyncThunk("auth/logout", async () => {
    const response = await authApi.register();
    return response;
});

const initialState = {
    loading: false,
    authenticated: false,
    user: {},
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [login.pending]: (state) => {
            state.loading = true;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.authenticated = false;
            state.error = action.error;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.authenticated = true;
            state.user = action.payload.data.user;
            localStorage.setItem("token", state.token);
        },
        [register.pending]: (state) => {
            state.loading = true;
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            state.authenticated = true;
            state.user = action.payload.data.user;
            localStorage.setItem("token", state.token);
        }
    },
});

export default authSlice.reducer;