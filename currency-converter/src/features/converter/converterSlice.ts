import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import converterAPI from './converterAPI';

export type ConverterParams = {
    amount: number,
    from: string,
    to: string,
}

export type ConvertedData = {
    date: string,
    info: {
        rate: number,
        timestamp: number,
    },
    query: {
        amount: number,
        from: string,
        to: string
    },
    result: number
}

export type ConvertError = {
    code: number
    message: string
}

export type ConverterState = {
    convertedData: ConvertedData | undefined
    isLoading: boolean
    error: ConvertError | undefined
}

const initialState: ConverterState = {
    convertedData: undefined,
    isLoading: false,
    error: undefined,
};

export const convert = createAsyncThunk(
    'converter/convert',
    async (params: ConverterParams, { rejectWithValue }) => {
        try {
            const data = await converterAPI.convert(params)
            if (!data.success) {
                console.log(data.error);
                
                return rejectWithValue(data.error)
            }
            console.log(data)
            return data as ConvertedData
        } catch (err) {
            const error: any = err
            const { status } = error.response
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return rejectWithValue({ code: status, info: message })
        }
    }
);

export const converterSlice = createSlice({
    name: 'converter',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
        .addCase(convert.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(convert.fulfilled, (state, action) => {
            state.isLoading = false;
            state.convertedData = action.payload;
        })
        .addCase(convert.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as ConvertError;
        });
    },
});

export const selectConvertedData = (state: RootState) => state.converter.convertedData;

export default converterSlice.reducer;
