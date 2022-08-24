import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: true,
  isLoading: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin(state) {
      state.isLogin = !state.isLogin;
    },
    setLoading(state) {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { setLogin, setLoading } = loginSlice.actions;

export default loginSlice.reducer;
