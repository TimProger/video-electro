import {IProduct} from "@/types/Product.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IProductState {
  products: IProduct[]
}

const initialState: IProductState = {
  products: [
    {
      name: "Yo"
    },
    {
      name: 'Saspp'
    },
    {
      name: 'Sasspp'
    },
    {
      name: 'Sadawdawdsspp'
    },
    {
      name: 'Sadawdawdsspp'
    },
    {
      name: 'Sadawdawdsspp'
    },
    {
      name: 'Sadawdawdsspp'
    },
    {
      name: 'Sadawdawdsspp'
    }
  ],
}

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state: IProductState, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
    }
  }
})

export const { setProducts } = ProductSlice.actions

export default ProductSlice.reducer