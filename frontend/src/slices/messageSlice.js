import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { actions as channelActions } from './channelSlice.js';

const messageAdapter = createEntityAdapter();
const initialState = messageAdapter.getInitialState();

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messageAdapter.addOne,
    addMessages: messageAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(channelActions.removeChannel, (state, action) => {
      const channelId = action.payload;
      const restEntities = Object.values(state.entities)
        .filter((message) => message.channelId !== channelId);
      messageAdapter.setAll(state, restEntities);
    });
  },
});

export const { addMessage, addMessages, removeMessages } = messageSlice.actions;
export const messageSelector = messageAdapter.getSelectors((state) => state.messages);

export default messageSlice.reducer;
