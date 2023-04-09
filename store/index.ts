import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import {combineReducers} from "@reduxjs/toolkit";
import ProductSlice from "@/store/Slices/Product.slice";
import {catalogApi} from "@/store/RTKQuery/Catalog.query";
import FavsSlice from "@/store/Slices/Favs.slice";

const combinedReducer = combineReducers({
  product: ProductSlice,
  favs: FavsSlice,
  [catalogApi.reducerPath]: catalogApi.reducer,
});

export const Store = () =>
  configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddlware) => {
      return getDefaultMiddlware().concat(catalogApi.middleware)
    }
  });

export type RootState = ReturnType<typeof combinedReducer>
export type AppStore = ReturnType<typeof Store>
export type AppDispatch = AppStore['dispatch']
export const wrapper = createWrapper(Store, { debug: true });