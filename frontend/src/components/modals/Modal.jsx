import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getModal from './index';
import { actions as modalActions } from '../../slices/modalsSlice';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
};

const Modal = () => {
  const modalInfo = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const hideModal = () => {
    dispatch(modalActions.setModal({ type: null, item: null }));
  };

  return (
    <>
      {renderModal({ modalInfo, hideModal })}
    </>
  );
};

export default Modal;
// END
