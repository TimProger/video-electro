import {IBasketProduct, IProductShort} from "@/types/Product.types";
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
    setBasketProductsShort: (state: IBasketState, action: PayloadAction<IProductShort[]>) => {
      // @ts-ignore
      state.products = action.payload.map((el) => {
        // if(el.availability <= 0){
        //   return Object.assign(el, {buy_now: false})
        // }
        return Object.assign(el,{buy_now: true})
      })
      state.totalPrice = action.payload.reduce((sum, el) => {
        return sum += +el.RetailPrice.toFixed(2)
      }, 0)
      state.discountedPrice = action.payload.reduce((sum, el) => {
        return sum += (el.discount ? +el.RetailPrice.toFixed(2) / 100 * el.discount : 0)
      }, 0)
    },
    setBasketProducts: (state: IBasketState, action: PayloadAction<IBasketProduct[]>) => {
      state.products = [...action.payload]
      state.totalPrice = action.payload.reduce((sum, el) => {
        return sum += +el.RetailPrice.toFixed(2)
      }, 0)
      state.discountedPrice = action.payload.reduce((sum, el) => {
        return sum += (el.discount ? +el.RetailPrice.toFixed(2) / 100 * el.discount : 0)
      }, 0)
    },
    addProductToBasket: (state: IBasketState, action: PayloadAction<IProductShort>) => {
      const elem = JSON.parse(JSON.stringify(action.payload))
      const newElem = Object.assign(elem,{buy_now: true})
      // @ts-ignore
      state.products = [...state.products, newElem]
      state.totalPrice += +action.payload.RetailPrice.toFixed(2)
      state.totalPrice = +state.totalPrice.toFixed(2)
      state.discountedPrice += (action.payload.discount ? +action.payload.RetailPrice.toFixed(2) / 100 * action.payload.discount : 0)
    },
    removeBasketProducts: (state: IBasketState, action: PayloadAction<number>) => {
      const elem = state.products.find((el) => el.id === action.payload)
      if(elem){
        state.totalPrice -= +elem.RetailPrice.toFixed(2)
        state.totalPrice = +state.totalPrice.toFixed(2)
        state.discountedPrice -= (elem.discount ? +elem.RetailPrice.toFixed(2) / 100 * elem.discount : 0)
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
          state.totalPrice += +elem.RetailPrice.toFixed(2)
          state.discountedPrice += (elem.discount ? +elem.RetailPrice.toFixed(2) / 100 * elem.discount : 0)
        }else{
          state.totalPrice -= +elem.RetailPrice.toFixed(2)
          state.discountedPrice -= (elem.discount ? +elem.RetailPrice.toFixed(2) / 100 * elem.discount : 0)
        }
      }
    },
    // selectAllBasketProducts: (state: IBasketState, action: PayloadAction<{ products: IBasketProduct[], buy_now: boolean }>) => {
    //   action.payload.products.map((product) => {
    //     const elem = state.products.find((el) => el.id === product.id)
    //     if(elem){
    //       if(elem.buy_now === action.payload.buy_now) return
    //       const index = state.products.indexOf(elem)
    //       state.products[index].buy_now = action.payload.buy_now
    //       if(action.payload.buy_now){
    //         state.totalPrice += elem.price
    //         state.discountedPrice += (elem.discount ? elem.price / 100 * elem.discount : 0)
    //       }else{
    //         state.totalPrice -= elem.price
    //         state.discountedPrice -= (elem.discount ? elem.price / 100 * elem.discount : 0)
    //       }
    //     }
    //   })
    // }
  }
})

export const {
  setBasketProducts,
  setBasketProductsShort,
  addProductToBasket,
  removeBasketProducts,
  selectBasketProduct,
  // selectAllBasketProducts
} = BasketSlice.actions

export default BasketSlice.reducer