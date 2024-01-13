/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const defaultChannelId = 1;
const initialState = channelsAdapter.getInitialState({ currentChannelId: defaultChannelId });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannel(state, { payload }) {
      state.currentChannelId = payload.id;
    },
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
    setInitial(state, { payload }) {
      const { channels, currentChannelId } = payload;
      channelsAdapter.addMany(state, channels);
      state.currentChannelId = currentChannelId;
    },
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
