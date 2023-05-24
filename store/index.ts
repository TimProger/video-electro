import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import {combineReducers} from "@reduxjs/toolkit";
import ProductSlice from "@/store/Slices/Product.slice";
import ProfileSlice from "@/store/Slices/Profile.slice";
import FavsSlice from "@/store/Slices/Favs.slice";
import BasketSlice from "@/store/Slices/Basket.slice";

const combinedReducer = combineReducers({
  product: ProductSlice,
  profile: ProfileSlice,
  favs: FavsSlice,
  basket: BasketSlice,
});

export const Store = () =>
  configureStore({
    reducer: combinedReducer,
  });

export type RootState = ReturnType<typeof combinedReducer>
export type AppStore = ReturnType<typeof Store>
export type AppDispatch = AppStore['dispatch']
export const wrapper = createWrapper(Store, { debug: true });