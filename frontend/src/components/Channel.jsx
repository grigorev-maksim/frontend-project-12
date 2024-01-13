import * as filter from 'leo-profanity';
import {
  Button, ButtonGroup, Dropdown, ListGroupItem,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as channelActions } from '../slices/channelsSlice';
import { actions as modalActions } from '../slices/modalsSlice';

const Channel = (props) => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { channel } = props;
  const { name, id, removable } = channel;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const btnVariant = currentChannelId === id ? 'secondary' : 'light';

  const handleClick = (channelObj) => {
    dispatch(channelActions.setActiveChannel(channelObj));
  };

  const handleRemoveClick = () => {
    dispatch(modalActions.setModal({ type: 'removingChannel', item: channel }));
  };

  const handleRenameClick = () => {
    dispatch(modalActions.setModal({ type: 'renamingChannel', item: channel }));
  };

  return (
    <ListGroupItem className="mx-2 p-0">
      {removable ? (
        <Dropdown as={ButtonGroup} className="w-100 rounded-0">
          <Button variant={btnVariant} className="w-100 rounded-0 text-start btn shadow-none text-truncate" onClick={() => handleClick(channel)}>
            {`# ${filter.clean(name)}`}
          </Button>
          <Dropdown.Toggle split variant={btnVariant} id="dropdown-split-basic" className="rounded-0">
            <span className="visually-hidden">{t('channels.manage')}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <Dropdown.Item onClick={() => handleRemoveClick()}>{t('buttons.remove')}</Dropdown.Item>
            <Dropdown.Item onClick={() => handleRenameClick()}>{t('buttons.rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button variant={btnVariant} className="w-100 rounded-0 text-start btn shadow-none text-truncate" onClick={() => handleClick(channel)}>
          {`# ${filter.clean(name)}`}
        </Button>
      )}
    </ListGroupItem>
  );
};

export default Channel;
