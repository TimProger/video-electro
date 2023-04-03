import {IProduct} from "@/types/Product.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IProductState {
  products: IProduct[]
}

const initialState: IProductState = {
  products: [
    {
      id: 0,
      name: "Винт M5х8 ДКС (для соединения крышек лотка)",
      discount: 30,
      image: 'https://sun9-66.userapi.com/impg/z60XzcTSDTO48u4U6k4Nf0fizg5WUhs0-4GyQw/FWhdFXk8P_Y.jpg?size=686x653&quality=96&sign=2367b18bc0afbd885c07b962898d9438&type=album',
      is_hit: false,
      is_new: true,
      product_more: [
        {
          id: 0,
          availability: 2,
          price: 1000000
        }
      ]
    },
    {
      id: 1,
      name: "Пресс-клещи КО-6Е для наконечников НШвИ Е-типа 6...16мм.кв. ИЭК",
      image: 'https://sun9-66.userapi.com/impg/z60XzcTSDTO48u4U6k4Nf0fizg5WUhs0-4GyQw/FWhdFXk8P_Y.jpg?size=686x653&quality=96&sign=2367b18bc0afbd885c07b962898d9438&type=album',
      is_hit: true,
      is_new: true,
      product_more: [
        {
          id: 0,
          availability: 0,
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
      product_more: [
        {
          id: 0,
          availability: 2,
          price: 1000000
        }
      ]
    },
    {
      id: 3,
      name: "Kolner KCD 14,4/2L Дрель-шуруповерт аккумуляторная 14,4 Во...",
      discount: 40,
      image: 'https://sun9-66.userapi.com/impg/z60XzcTSDTO48u4U6k4Nf0fizg5WUhs0-4GyQw/FWhdFXk8P_Y.jpg?size=686x653&quality=96&sign=2367b18bc0afbd885c07b962898d9438&type=album',
      is_hit: false,
      is_new: false,
      product_more: [
        {
          id: 0,
          availability: 0,
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