import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import currencyDataAPI from './currencyDataAPI';

export enum Currency {
    RUB = 'RUB',
    USD = 'USD',
    EUR = 'EUR',
}

export const currencies = Object.keys(Currency).filter((item) => {
    return isNaN(Number(item));
});

const source = Currency.RUB

// export type Rates = {
//     rates: [string, number][]
// }

export type ExchangeRates = {
    quotes: any
    source: string
    success: boolean
    timestamp: number
}

export type CurrencyError = {
    code: number
    info: string
}

export type CurrencyDataState = {
    exchangeRates: ExchangeRates | undefined
    source: Currency
    isLoading: boolean
    error: CurrencyError | undefined
}

const initialState: CurrencyDataState = {
    exchangeRates: undefined,
    source: source,
    isLoading: false,
    error: undefined,
};

export const getData = createAsyncThunk(
    'currencyData/getExchangeRates',
    async (source: Currency, { rejectWithValue }) => {
        try {
            const data = await currencyDataAPI.getData(source)
            if (!data.success) {
                return rejectWithValue(data.error)
            }
            console.log(data)
            return data as ExchangeRates
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

export const currencyDataSlice = createSlice({
    name: 'currencyData',
    initialState,
    reducers: {
        setSource: (state, action) => {
            state.source = action.payload
        }
        // increment: (state) => {
        // state.value += 1;
        // },
        // decrement: (state) => {
        // state.value -= 1;
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        // state.value += action.payload;
        // },
    },

    extraReducers: (builder) => {
        builder
        .addCase(getData.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.exchangeRates = action.payload;
        })
        .addCase(getData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as CurrencyError;
        });
    },
});

export const { setSource } = currencyDataSlice.actions;

export const selectExchangeRates = (state: RootState) => state.currencyData.exchangeRates;
export const selectSource = (state: RootState) => state.currencyData.source;

export default currencyDataSlice.reducer;
