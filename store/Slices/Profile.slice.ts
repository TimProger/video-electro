import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from "@/types/Profile.types";

interface IProfileState {
  isLoading: boolean;
  error: string | null;
  user: IUser | null;
  isAuth: boolean;
  headerShow: boolean;
}

const initialState: IProfileState = {
  isLoading: false,
  error: null,
  user: null,
  isAuth: false,
  headerShow: false
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
    setUser: (state: IProfileState, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    setHeader: (state: IProfileState, action: PayloadAction<boolean>) => {
      state.headerShow = action.payload
    },
  }
})

export const { exit, setImage, setUser, setHeader } = profileSlice.actions

export default profileSlice.reducer