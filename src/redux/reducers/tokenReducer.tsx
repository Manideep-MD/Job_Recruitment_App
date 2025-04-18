import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface TokenState {
  loginToken: string | null;
  isProfileCompleted:boolean
}

const initialState: TokenState = {
  loginToken: null,
  isProfileCompleted: false
};

export const tokenReducers = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_TOKEN: (state, action: PayloadAction<string>) => {
      state.loginToken = action.payload;
    },
    SET_PROFILE: (state, action: PayloadAction<boolean>) => {
      state.isProfileCompleted = action.payload;
    },
    REMOVE_TOKEN: state => {
      state.loginToken = null;
    },
  },
});

export const {SET_TOKEN, REMOVE_TOKEN,SET_PROFILE} = tokenReducers.actions;

export default tokenReducers.reducer;
