import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { type: null, channelId: null },
  reducers: {
    openModal:
      (_, action) => (
        { type: action.payload.type, channelId: action.payload.channelId || null }
      ),
    closeModal: () => ({ type: null, channelId: null }),
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
