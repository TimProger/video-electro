import {IProductShort} from "@/types/Product.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IProductState {
  products: IProductShort[]
}

const initialState: IProductState = {
  products: []
}

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state: IProductState, action: PayloadAction<IProductShort[]>) => {
      state.products = action.payload
    }
  }
})

export const { setProducts } = ProductSlice.actions

export default ProductSlice.reducer