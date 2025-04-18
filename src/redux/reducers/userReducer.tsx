import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  name: string;
  dob: string;
  email: string;
  mobile: string;
  gender: string;
  countryCode: string;
  profile_img: { uri: string; type: string; name: string } | null;
}

const initialState: UserProfile = {
  name: '',
  dob: '',
  email: '',
  mobile: '',
  gender: '',
  countryCode: '+91',
  profile_img: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveProfile(state, action: PayloadAction<UserProfile>) {
      return { ...state, ...action.payload };
    },
    clearProfile(state) {
      return initialState;
    },
  },
});

export const { saveProfile,clearProfile } = userSlice.actions;
export default userSlice.reducer;
