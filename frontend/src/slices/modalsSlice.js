/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  item: null,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModal(state, { payload }) {
      state.type = payload.type;
      state.item = payload.item;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
