import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useRef, useContext } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import socket from '../socket';
import i18next from '../utilits/i18n';
import { AuthContext } from './AuthProvider';

const MessageInput = (props) => {
  const { inputRef, currentChannel } = props;
  const auth = useContext(AuthContext);
  const username = auth.getUsername();
  const buttonRef = useRef();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      newMessage: '',
    },
    onSubmit: ({ newMessage }, actions) => {
      if (newMessage === '' || newMessage.trim() === '') return;

      const body = filter.clean(newMessage);
      socket.emit('newMessage', { body, channelId: currentChannel.id, username }, (response) => {
        if (response.status !== 'ok') {
          toast.error(t('toasts.error.network'));
          return;
        }

        actions.resetForm();
      });
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <Form.Group className="input-group has-validation">
          <Form.Control
            name="newMessage"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.newMessage}
            ref={inputRef}
            className="border-0 p-0 ps-2 form-control"
            placeholder={i18next.t('privatePage.newMessage')}
            aria-label="Новое сообщение"
          />
          <Button
            className="border-0"
            variant="outline-secondary"
            type="submit"
            ref={buttonRef}
            disabled={!(formik.isValid && formik.dirty)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="black"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
            <span className="visually-hidden">{i18next.t('send')}</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageInput;
