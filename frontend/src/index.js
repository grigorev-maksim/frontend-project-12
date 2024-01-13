/* eslint-disable consistent-return */
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as filter from 'leo-profanity';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import resources from './locales/index';

import { actions as channelActions } from './slices/channelsSlice';
import { actions as messageActions } from './slices/messagesSlice';

import App from './App';
import ApiContext from './contexts/ApiContext';
import store from './slices/index.js';

const app = async () => {
  filter.add(filter.getDictionary('ru'));
  const socket = io();

  const handleSocketEmit = (type, values) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject();
    }, 5000);
    socket.volatile.emit(type, values, (response) => {
      const { status, data } = response;
      if (status === 'ok') {
        clearTimeout(timer);
        return resolve(data);
      }
      reject();
    });
  });

  const api = {
    newMessage: (values) => handleSocketEmit('newMessage', values),
    newChannel: (values) => handleSocketEmit('newChannel', values),
    renameChannel: (values) => handleSocketEmit('renameChannel', values),
    removeChannel: (values) => handleSocketEmit('removeChannel', values),
  };

  const i18n = i18next.createInstance();
  const options = {
    resources,
    fallbackLng: 'ru',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  };

  await i18n
    .use(initReactI18next)
    .init(options);

  socket.on('removeChannel', (payload) => {
    store.dispatch(channelActions.removeChannel(payload.id));
    const { channels: { currentChannelId } } = store.getState();
    return currentChannelId === payload.id
      ? store.dispatch(channelActions.setActiveChannel({ id: 1 })) : null;
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(channelActions.renameChannel(
      { id: payload.id, changes: { name: payload.name } },
    ));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelActions.addChannel(payload));
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(messageActions.addMessage(payload));
  });

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <I18nextProvider i18n={i18n}>
      <ApiContext.Provider value={api}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApiContext.Provider>
    </I18nextProvider>,
  );
};

app();
