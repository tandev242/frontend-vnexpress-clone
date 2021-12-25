import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authApi from '../apis/authApi'

export const getCurrentUser = createAsyncThunk(
  'auth/currentUser',
  async (params, { rejectWithValue }) => {
    try {
      const res = await authApi.getCurrentUser()
      const currentUser = res.data.user
      return currentUser
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (user, { rejectWithValue }) => {
    try {
      const response = await authApi.login(user)
      return response
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (user, { rejectWithValue }) => {
    try {
      await authApi.register(user)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const registerAdmin = createAsyncThunk(
  'auth/registerAdmin',
  async (user, { rejectWithValue }) => {
    try {
      const response = await authApi.registerAdmin(user)
      return response
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (user, { rejectWithValue }) => {
    try {
      const response = await authApi.forgotPassword(user)
      return response
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.resetPassword(data.password, data.token)

      return response
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  loading: false,
  authenticated: false,
  user: {},
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      window.localStorage.token = ''
      state.authenticated = false
      state.user = {}
    },
    closeError: (state) => {
      state.error = null
    },
  },
  extraReducers: {
    [getCurrentUser.pending]: (state) => {
      state.loading = true
    },
    [getCurrentUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.loading = false
      state.user = action.payload
      state.authenticated = true
    },

    [login.pending]: (state) => {
      state.loading = true
    },
    [login.rejected]: (state, action) => {
      state.loading = false
      state.authenticated = false
      state.error = action.payload.msg
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false
      state.authenticated = true
      state.user = action.payload.data.user
      localStorage.setItem('token', action.payload.data.token)
    },
    [register.pending]: (state) => {
      state.loading = true
    },
    [register.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.msg
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
    },
    [registerAdmin.pending]: (state) => {
      state.loading = true
    },
    [registerAdmin.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.msg
    },
    [registerAdmin.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
    },
    [forgotPassword.pending]: (state) => {
      state.loading = true
    },
    [forgotPassword.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.msg
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.loading = false
    },
    [resetPassword.pending]: (state) => {
      state.loading = true
    },
    [resetPassword.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.msg
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.loading = false
    },
  },
})

export default authSlice.reducer
export const authAction = authSlice.actions
