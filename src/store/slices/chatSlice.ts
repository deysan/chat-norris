import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatId: ' ',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat(state, action) {
      state.chatId = action.payload;
    },
  },
});

export const { setChat } = chatSlice.actions;

export default chatSlice.reducer;
