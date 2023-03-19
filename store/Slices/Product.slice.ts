import {IProduct} from "@/types/Product.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IProductState {
  products: IProduct[]
}

const initialState: IProductState = {
  products: [
    {
      id: 0,
      name: "Yo",
      discount: 40,
      image: 'https://sun9-66.userapi.com/impg/z60XzcTSDTO48u4U6k4Nf0fizg5WUhs0-4GyQw/FWhdFXk8P_Y.jpg?size=686x653&quality=96&sign=2367b18bc0afbd885c07b962898d9438&type=album',
      is_hit: true,
      product_more: [
        {
          id: 0,
          availability: 2,
          price: 1000000
        }
      ]
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