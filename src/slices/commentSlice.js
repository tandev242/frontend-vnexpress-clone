import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentApi from "../apis/commentApi";

export const addTopicComment = createAsyncThunk("comment/addTopicComment", async (data, { rejectWithValue }) => {
    try {
        const response = await commentApi.addTopicComment(data)
        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const addSubTopicComment = createAsyncThunk("comment/addSubTopicComment", async (data, { rejectWithValue }) => {
    try {
        const response = await commentApi.addSubTopicComment(data)
        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const addPostComment = createAsyncThunk("comment/addPostComment", async (data, { rejectWithValue }) => {
    try {
        const response = await commentApi.addPostComment(data)
        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const addSubPostComment = createAsyncThunk("comment/addSubPostComment", async (data, { rejectWithValue }) => {
    try {
        const response = await commentApi.addSubPostComment(data)
        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const initialState = {
    loading: false,
    error: null,
};

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    extraReducers: {
        [addTopicComment.pending]: (state) => {
            state.isLoading = true;
        },
        [addTopicComment.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [addTopicComment.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [addSubTopicComment.pending]: (state) => {
            state.isLoading = true;
        },
        [addSubTopicComment.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [addSubTopicComment.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [addPostComment.pending]: (state) => {
            state.isLoading = true;
        },
        [addPostComment.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [addPostComment.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [addSubPostComment.pending]: (state) => {
            state.isLoading = true;
        },
        [addSubPostComment.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [addSubPostComment.fulfilled]: (state, action) => {
            state.loading = false;
        },
    },
});

export default commentSlice.reducer;