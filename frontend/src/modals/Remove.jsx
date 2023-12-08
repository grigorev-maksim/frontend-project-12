import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../slices/modalSlice';
import { channelSelector, setCurrentChannel } from '../slices/channelSlice';
import socket from '../socket.js';

const Remove = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelSelector.selectAll);
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const modal = useSelector((state) => state.modal);
  const { t } = useTranslation();

  const submitRemoval = () => {
    socket.emit('removeChannel', { id: modal.channelId }, (response) => {
      if (response.status !== 'ok') {
        toast.error(t('toasts.error.network'));
        return;
      }
      if (currentChannel.id === modal.channelId) dispatch(setCurrentChannel(channels[0]));
      toast.success(t('toasts.success.channelRemoved'));
      dispatch(closeModal(modal));
    });
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={() => { dispatch(closeModal(modal)); }}>
        <Modal.Title>{t('modal.header.removing')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-muted">{t('modal.question')}</p>
        <div className="d-flex flex-row-reverse mt-3 gap-2">
          <Button variant="danger" type="submit" onClick={submitRemoval}>{t('modal.button.remove')}</Button>
          <Button variant="secondary" onClick={() => { dispatch(closeModal(modal)); }}>{t('modal.button.cancel')}</Button>
        </div>
      </Modal.Body>

    </Modal>
  );
};

export default Remove;
