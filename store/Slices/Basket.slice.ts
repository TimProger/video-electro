import {IBasketProduct, IProduct} from "@/types/Product.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IBasketState {
  products: IBasketProduct[];
  totalPrice: number;
  discountedPrice: number;
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
      availability: 2,
      price: 50000,
      buy_now: true
    },
    {
      id: 1,
      name: "Пресс-клещи КО-6Е для наконечников НШвИ Е-типа 6...16мм.кв. ИЭКПресс-клещи КО-6Е для наконечников НШвИ Е-типа 6...16мм.кв. ИЭКПресс-клещи КО-6Е для наконечников НШвИ Е-типа 6...16мм.кв. ИЭК",
      image: 'https://sun9-66.userapi.com/impg/z60XzcTSDTO48u4U6k4Nf0fizg5WUhs0-4GyQw/FWhdFXk8P_Y.jpg?size=686x653&quality=96&sign=2367b18bc0afbd885c07b962898d9438&type=album',
      is_hit: true,
      is_new: true,
      article: '00025',
      availability: 3,
      price: 70000,
      buy_now: true
    },
  ],
  totalPrice: 120000,
  discountedPrice: 15000
}

export const BasketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasketProducts: (state: IBasketState, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload.map((el) => {
        if(el.availability <= 0){
          return Object.assign(el, {buy_now: false})
        }
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