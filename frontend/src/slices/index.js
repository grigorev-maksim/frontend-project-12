import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelSlice.js';
import messagesReducer from './messageSlice.js';
import modalReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
});
