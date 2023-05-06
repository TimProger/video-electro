import {IBasketProduct, IProduct} from "@/types/Product.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IBasketState {
  products: IBasketProduct[];
  totalPrice: number;
  discountedPrice: number;
}

const initialState: IBasketState = {
  products: [],
  totalPrice: 0,
  discountedPrice: 0
}

export const BasketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasketProducts: (state: IBasketState, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload.map((el) => {
        return Object.assign(el, {buy_now: true})
      })
      state.totalPrice = action.payload.reduce((sum, el) => {
        return sum += el.price
      }, 0)
      state.discountedPrice = action.payload.reduce((sum, el) => {
        return sum += (el.discount ? el.price / 100 * el.discount : 0)
      }, 0)
    },
    addProductToBasket: (state: IBasketState, action: PayloadAction<IProduct>) => {
      const elem = JSON.parse(JSON.stringify(action.payload))
      const newElem = Object.assign({}, elem, {buy_now: true})
      state.products = [...state.products, newElem]
      state.totalPrice += action.payload.price
      state.discountedPrice += (action.payload.discount ? action.payload.price / 100 * action.payload.discount : 0)
    },
    removeBasketProducts: (state: IBasketState, action: PayloadAction<number>) => {
      const elem = state.products.find((el) => el.id === action.payload)
      if(elem){
        state.totalPrice -= elem.price
        state.discountedPrice -= (elem.discount ? elem.price / 100 * elem.discount : 0)
        const index = state.products.indexOf(elem)
        state.products.splice(index, 1)
      }
    },
    selectBasketProduct: (state: IBasketState, action: PayloadAction<{ id: number, buy_now: boolean }>) => {
      const elem = state.products.find((el) => el.id === action.payload.id)
      if(elem){
        const index = state.products.indexOf(elem)
        state.products[index].buy_now = action.payload.buy_now
        if(action.payload.buy_now){
          state.totalPrice += elem.price
          state.discountedPrice += (elem.discount ? elem.price / 100 * elem.discount : 0)
        }else{
          state.totalPrice -= elem.price
          state.discountedPrice -= (elem.discount ? elem.price / 100 * elem.discount : 0)
        }
      }
    }
  }
})

export const {
  setBasketProducts,
  addProductToBasket,
  removeBasketProducts,
  selectBasketProduct
} = BasketSlice.actions

export default BasketSlice.reducer