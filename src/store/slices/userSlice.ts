import { createSlice } from '@reduxjs/toolkit';

interface User {
  id: string | null;
  email: string | null;
  username: string | null;
  photo: string | null;
  token: string | null;
}

const initialState: User = {
  id: null,
  email: null,
  username: null,
  photo: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.photo = action.payload.photo;
      state.token = action.payload.token;
    },
    removeUser(state) {
      state.id = null;
      state.email = null;
      state.username = null;
      state.photo = null;
      state.token = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
