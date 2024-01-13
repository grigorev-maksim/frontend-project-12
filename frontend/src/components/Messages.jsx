import * as filter from 'leo-profanity';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectByChannelIds } from '../slices/messagesSlice';
import { selectors as channelSelectors } from '../slices/channelsSlice';
import Message from './Message';
import MessageInput from './MessageInput';

const Messages = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channels = useSelector(channelSelectors.selectAll);
  const activeChannel = channels.find((channel) => channel.id === currentChannelId);
  const { name, id } = activeChannel || {};
  const messages = useSelector(selectByChannelIds(id));
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <div className="mb-4 shadow-sm small p-3 bg-light">
        <p className="m-0">
          <b>{`# ${filter.clean(name)}`}</b>
        </p>
        <span className="text-muted">{t('messages.messageCounter.count', { count: messages.length })}</span>
      </div>
      <div className="overflow-auto px-5">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <MessageInput />
      </div>
    </div>
  );
};

export default Messages;
