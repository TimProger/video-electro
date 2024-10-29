import {IProductShort} from "@/types/Product.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IFavsState {
  products: IProductShort[]
}

const initialState: IFavsState = {
  products: []
}

export const FavsSlice = createSlice({
  name: 'favs',
  initialState,
  reducers: {
    setFavsProducts: (state: IFavsState, action: PayloadAction<IProductShort[]>) => {
      state.products = action.payload
    },
    toggleFavsProduct: (state: IFavsState, action: PayloadAction<IProductShort>) => {
      const includes = state.products.find((el)=>el.id === action.payload.id)
      if(!includes){
        state.products.push(action.payload)
      }else{
        const index = state.products.indexOf(includes)
        state.products.splice(index, 1)
      }
    },
    removeFavsProduct: (state: IFavsState, action: PayloadAction<number>) => {
      const product = state.products.find((el)=>el.id === action.payload)
      if(product){
        let index = state.products.indexOf(product)
        state.products.splice(index, 1)
      }
    }
  }
})

export const { setFavsProducts, removeFavsProduct, toggleFavsProduct } = FavsSlice.actions

export default FavsSlice.reducer