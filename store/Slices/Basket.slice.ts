import {IProduct} from "@/types/Product.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IBasketState {
  products: IProduct[];
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
      price: 50000
    },
    {
      id: 1,
      name: "Пресс-клещи КО-6Е для наконечников НШвИ Е-типа 6...16мм.кв. ИЭКПресс-клещи КО-6Е для наконечников НШвИ Е-типа 6...16мм.кв. ИЭКПресс-клещи КО-6Е для наконечников НШвИ Е-типа 6...16мм.кв. ИЭК",
      image: 'https://sun9-66.userapi.com/impg/z60XzcTSDTO48u4U6k4Nf0fizg5WUhs0-4GyQw/FWhdFXk8P_Y.jpg?size=686x653&quality=96&sign=2367b18bc0afbd885c07b962898d9438&type=album',
      is_hit: true,
      is_new: true,
      article: '00025',
      availability: 3,
      price: 70000
    },
  ],
  totalPrice: 0,
  discountedPrice: 0
}

export const BasketSlice = createSlice({
  name: 'favs',
  initialState,
  reducers: {
    setBasketProducts: (state: IBasketState, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
      state.totalPrice = action.payload.reduce((sum, el) => {
        return sum += el.price
      }, 0)
      state.discountedPrice = action.payload.reduce((sum, el) => {
        return sum += (el.discount ? el.price / 100 * el.discount : 0)
      }, 0)
    },
    toggleBasketProduct: (state: IBasketState, action: PayloadAction<IProduct>) => {
      const includes = state.products.find((el)=>el.id === action.payload.id)
      if(!includes){
        state.products.push(action.payload)
        state.totalPrice = state.products.reduce((sum, el) => {
          return sum += (el.discount ? el.price - (el.price / 100 * el.discount) : el.price)
        }, 0)
      }else{
        const index = state.products.indexOf(includes)
        state.products.splice(index, 1)
        state.totalPrice = state.products.reduce((sum, el) => {
          return sum += (el.discount ? el.price - (el.price / 100 * el.discount) : el.price)
        }, 0)
      }
    },
    removeBasketProduct: (state: IBasketState, action: PayloadAction<number>) => {
      const product = state.products.find((el)=>el.id === action.payload)
      if(product){
        let index = state.products.indexOf(product)
        state.products.splice(index, 1)
        state.totalPrice = state.products.reduce((sum, el) => {
          return sum += (el.discount ? el.price - (el.price / 100 * el.discount) : el.price)
        }, 0)
      }
    }
  }
})

export const { setBasketProducts, removeBasketProduct, toggleBasketProduct } = BasketSlice.actions

export default BasketSlice.reducer