import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from "@/types/Profile.types";

interface IProfileState {
  isLoading: boolean;
  error: string | null;
  user: IUser | null;
  isAuth: boolean;
  headerShow: boolean;
  width: 'desktop' | 'tablet' | 'mobile'
}

const initialState: IProfileState = {
  isLoading: false,
  error: null,
  user: null,
  isAuth: false,
  headerShow: false,
  width: 'desktop'
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    exit: (state: IProfileState) => {
      state.user = null
      state.isAuth = false
    },
    setImage: (state: IProfileState, action: PayloadAction<any>) => {
      if(state.user){
        state.user.user_image = action.payload

      }
    },
    setUser: (state: IProfileState, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
    },
    setHeader: (state: IProfileState, action: PayloadAction<boolean>) => {
      state.headerShow = action.payload
    },
    setWidth: (state: IProfileState, action: PayloadAction<'desktop' | 'tablet' | 'mobile'>) => {
      state.width = action.payload
    }
  }
})

export const { exit, setImage, setUser, setHeader, setWidth } = profileSlice.actions

export default profileSlice.reducer