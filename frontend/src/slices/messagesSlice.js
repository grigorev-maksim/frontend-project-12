/* eslint-disable no-param-reassign */
import
{
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import { actions as channelActions } from './channelsSlice';

const messageAdapter = createEntityAdapter();

const initialState = messageAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messageAdapter.addOne,
    addMessages: messageAdapter.addMany,
  },
  extraReducers: (builder) => {
    const { removeChannel, setInitial } = channelActions;
    builder
      .addCase(removeChannel, (state, { payload }) => {
        const restEntities = Object.values(state.entities)
          .filter((message) => message.channelId !== payload);
        messageAdapter.setAll(state, restEntities);
      })
      .addCase(setInitial, (state, { payload }) => {
        const { messages } = payload;
        messageAdapter.addMany(state, messages);
      });
  },
});

export const { actions } = messagesSlice;
export const selectors = messageAdapter.getSelectors((state) => state.messages);
export const selectByChannelIds = (id) => createSelector(
  selectors.selectAll,
  (messages) => messages.filter((message) => Number(message.channelId) === Number(id)),
);
export default messagesSlice.reducer;
