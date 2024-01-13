import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useApi, useAuth } from '../hooks';

const MessageInput = () => {
  const [messageText, setMessageText] = useState('');
  const [disabledInput, setDisable] = useState(!messageText.trim());
  const { t } = useTranslation();
  const channelId = useSelector((state) => state.channels.currentChannelId);
  const auth = useAuth();
  const api = useApi();
  const inputEl = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    const { username } = auth;
    try {
      await api.newMessage({ body: messageText, channelId, username });
      setMessageText('');
      setDisable(true);
      inputEl.current.focus();
    } catch (err) {
      setDisable(false);
      inputEl.current.focus();
      inputEl.current.select();
    }
  };

  const handleChange = (e) => {
    setMessageText(e.target.value);
    setDisable(!e.target.value.trim());
  };

  return (
    <Form noValidate onSubmit={(e) => handleSubmit(e)}>
      <InputGroup size="lg" className="mb-3">
        <Form.Control
          ref={inputEl}
          name="message"
          type="text"
          aria-label={t('messages.newMessage')}
          placeholder={t('messages.messageInput')}
          value={messageText}
          onChange={(e) => handleChange(e)}
          autoFocus
        />
        <Button variant="outline-secondary" type="submit" disabled={disabledInput}>
          <span>
            <i className="bi bi-send" />
          </span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageInput;
