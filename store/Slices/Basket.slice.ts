import {IProduct} from "@/types/Product.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IBasketState {
  products: IProduct[]
  totalPrice: number
}

const initialState: IBasketState = {
  products: [
    {
      id: 0,
      name: "Винт M5х8 ДКС (для соединения крышек лотка)",
      discount: 30,
      image: 'https://sun9-66.userapi.com/impg/z60XzcTSDTO48u4U6k4Nf0fizg5WUhs0-4GyQw/FWhdFXk8P_Y.jpg?size=686x653&quality=96&sign=2367b18bc0afbd885c07b962898d9438&type=album',
      is_hit: false,
      is_new: true,
      article: '00025',
      product_more: [
        {
          id: 0,
          availability: 2,
          price: 1000000
        }
      ]
    },
    {
      id: 2,
      name: "ИК-Датчик движ ДД-009 1100Вт (обзор=180гр./дальн.=12м) IP44 настен...",
      discount: 20,
      image: 'https://sun9-66.userapi.com/impg/z60XzcTSDTO48u4U6k4Nf0fizg5WUhs0-4GyQw/FWhdFXk8P_Y.jpg?size=686x653&quality=96&sign=2367b18bc0afbd885c07b962898d9438&type=album',
      is_hit: true,
      is_new: false,
      article: '00025',
      product_more: [
        {
          id: 0,
          availability: 2,
          price: 1000000
        }
      ]
    }
  ],
  totalPrice: 0
}

export const BasketSlice = createSlice({
  name: 'favs',
  initialState,
  reducers: {
    setBasketProducts: (state: IBasketState, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
      state.totalPrice = action.payload.reduce((sum, el) => {
        return sum += (el.discount ? el.product_more[0].price - (el.product_more[0].price / 100 * el.discount) : el.product_more[0].price)
      }, 0)
    },
    toggleBasketProduct: (state: IBasketState, action: PayloadAction<IProduct>) => {
      const includes = state.products.find((el)=>el.id === action.payload.id)
      if(!includes){
        state.products.push(action.payload)
        state.totalPrice = state.products.reduce((sum, el) => {
          return sum += (el.discount ? el.product_more[0].price - (el.product_more[0].price / 100 * el.discount) : el.product_more[0].price)
        }, 0)
      }else{
        const index = state.products.indexOf(includes)
        state.products.splice(index, 1)
        state.totalPrice = state.products.reduce((sum, el) => {
          return sum += (el.discount ? el.product_more[0].price - (el.product_more[0].price / 100 * el.discount) : el.product_more[0].price)
        }, 0)
      }
    },
    removeBasketProduct: (state: IBasketState, action: PayloadAction<number>) => {
      const product = state.products.find((el)=>el.id === action.payload)
      if(product){
        let index = state.products.indexOf(product)
        state.products.splice(index, 1)
        state.totalPrice = state.products.reduce((sum, el) => {
          return sum += (el.discount ? el.product_more[0].price - (el.product_more[0].price / 100 * el.discount) : el.product_more[0].price)
        }, 0)
      }
    }
  }
})

export const { setBasketProducts, removeBasketProduct, toggleBasketProduct } = BasketSlice.actions

export default BasketSlice.reducer