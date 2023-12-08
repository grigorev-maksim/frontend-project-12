import { useRef, useEffect } from 'react';
import uuid from 'react-uuid';

const Messages = (props) => {
  const { currentMessages } = props;
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.lastChild?.scrollIntoView(false);
  }, [currentMessages]);

  return (
    <div ref={containerRef} className="px-5 overflow-auto" id="messages-box">
      {currentMessages.map((message) => (
        <div className="mb-2 text-break" key={uuid()}>
          <b>{message.username}</b>
          {': '}
          {message.body}
        </div>
      ))}
    </div>
  );
};

export default Messages;
