import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface TokenState {
  loginToken: string | null;
}

const initialState: TokenState = {
  loginToken: null,
};

export const tokenReducers = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_TOKEN: (state, action: PayloadAction<string>) => {
      state.loginToken = action.payload;
    },
    REMOVE_TOKEN: state => {
      state.loginToken = null;
    },
  },
});

export const {SET_TOKEN, REMOVE_TOKEN} = tokenReducers.actions;

export default tokenReducers.reducer;
