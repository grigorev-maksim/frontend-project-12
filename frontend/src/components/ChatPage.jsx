import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {
  useEffect, useRef, useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container, Col, Stack, Row,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Modal from '../modals/Modal';
import { AuthContext } from './AuthProvider';
import { openModal } from '../slices/modalSlice';
import {
  addChannels, addChannel, removeChannel, renameChannel, setCurrentChannel,
} from '../slices/channelSlice';
import { addMessages, addMessage, messageSelector } from '../slices/messageSlice';
import ChannelsList from './ChannelsList.jsx';
import MessageInput from './MessageInput.jsx';
import Messages from './Messages.jsx';
import socket from '../socket';
import { apiRoutes, navigationRoutes } from '../routes';

const getChatData = (token) => axios.get(apiRoutes.data(), { headers: { Authorization: `Bearer ${token}` } });

const ChatPage = () => {
  const auth = useContext(AuthContext);
  const messages = useSelector(messageSelector.selectAll);
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const { t } = useTranslation();
  const currentMessages = messages.filter((message) => message.channelId === currentChannel.id);

  useEffect(() => {
    inputRef.current.focus();

    const uploadInitialData = async () => {
      const { data, status } = await getChatData(auth.getToken());

      if (status === 401) {
        toast.warning(t('toasts.error.network'));
        auth.logOut();
        navigate(navigationRoutes.login());
      }

      dispatch(addChannels(data.channels));
      dispatch(addMessages(data.messages));
      const [initialCurrentChannel] = data.channels
        .filter((channel) => channel.id === data.currentChannelId);
      dispatch(setCurrentChannel(initialCurrentChannel));
    };
    try {
      uploadInitialData();
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, auth, navigate, t]);

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload.id));
    });
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel({ id: payload.id, changes: payload }));
    });
  }, [dispatch]);

  return (
    <Container className="container h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100">
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('privatePage.channels')}</b>
            <button type="button" onClick={() => { dispatch(openModal({ type: 'adding' })); }} className="p-0 text-primary btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ChannelsList />
        </Col>
        <Col className="h-100 p-0">
          <Stack className="h-100">
            <div className="bg-light mb-3 p-3 shadow-sm small">
              <p className="mb-0">
                <b>
                  #
                  {currentChannel.name}
                </b>
              </p>
              <span className="text-muted">{t('privatePage.messager.message', { count: currentMessages.length })}</span>
            </div>
            <Messages currentMessages={currentMessages} />
            <MessageInput inputRef={inputRef} currentChannel={currentChannel} />
          </Stack>
        </Col>
      </Row>
      <Modal />
    </Container>
  );
};

export default ChatPage;
