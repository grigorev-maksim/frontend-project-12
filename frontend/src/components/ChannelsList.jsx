import { useEffect, useRef } from 'react';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import { useTranslation } from 'react-i18next';
import { openModal } from '../slices/modalSlice';
import { channelSelector, setCurrentChannel } from '../slices/channelSlice';

const ChannelsList = () => {
  const channels = useSelector(channelSelector.selectAll);
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.lastChild?.scrollIntoView(false);
  }, [channels]);

  return (
    <ul className="flex-column px-2 overflow-auto h-100" ref={containerRef}>
      {channels.map((channel) => {
        const variant = (currentChannel.id === channel.id) ? 'secondary' : 'light';
        return (
          <li className="w-100 text-break" key={uuid()}>
            <Dropdown className="shadow-none d-flex" as={ButtonGroup}>
              <Button variant={variant} className="w-100 rounded-0 text-start btn text-truncate" onClick={() => dispatch(setCurrentChannel(channel))}>
                <span className="me-1">#</span>
                {channel.name}
              </Button>
              {
                channel.removable && (
                  <Dropdown.Toggle split variant={variant} id="dropdown-split-basic">
                    <span className="visually-hidden">{t('modal.channelSettings')}</span>
                  </Dropdown.Toggle>
                )
              }
              <Dropdown.Menu>
                <Dropdown.Item
                  eventKey="1"
                  onClick={() => {
                    dispatch(openModal({ type: 'removing', channelId: channel.id }));
                  }}
                >
                  {t('modal.button.remove')}
                  <span className="visually-hidden">{t('modal.button.remove')}</span>
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => {
                    dispatch(openModal({ type: 'renaming', channelId: channel.id }));
                  }}
                >
                  {t('modal.button.rename')}
                  <span className="visually-hidden">{t('modal.button.rename')}</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        );
      })}
    </ul>
  );
};

export default ChannelsList;
