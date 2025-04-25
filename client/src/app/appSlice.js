import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncAction'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        isLoading: false,
        categories: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCategories.pending, (state, action) => {
            state.isLoading = false,
                state.categories = []
        });
        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            state.isLoading = false,
                state.categories = action.payload.data
        });
        builder.addCase(actions.getCategories.rejected, (state, action) => {
            state.isLoading = false,
                state.categories = []
        });
    }
})
export default appSlice.reducer