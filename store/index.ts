import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import {combineReducers} from "@reduxjs/toolkit";
import ProductSlice from "@/store/Slices/Product.slice";

const combinedReducer = combineReducers({
  product: ProductSlice
});

export const Store = () =>
  configureStore({
    reducer: combinedReducer,
  });

export type RootState = ReturnType<typeof combinedReducer>
export type AppStore = ReturnType<typeof Store>
export type AppDispatch = AppStore['dispatch']
export const wrapper = createWrapper(Store, { debug: true });