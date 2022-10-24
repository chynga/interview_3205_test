import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import currencyDataReducer from '../features/currencyData/currencyDataSlice';
import converterReducer from '../features/converter/converterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    currencyData: currencyDataReducer,
    converter: converterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
