import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: true,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin(state) {
      state.isLogin = !state.isLogin;
    },
  },
});

export const { setLogin } = loginSlice.actions;

export default loginSlice.reducer;
