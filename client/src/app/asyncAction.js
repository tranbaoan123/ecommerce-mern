import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../api/index'
export const getCategories = createAsyncThunk('app/categories', async (data, { rejectWithValues }) => {
    const response = await apis.apiGetCategories()
    if (!response.success) {
        return rejectWithValues(response)
    }
    return response
})