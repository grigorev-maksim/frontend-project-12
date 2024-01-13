import React from 'react';
import {
  Button, Col, ListGroup, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { selectors } from '../slices/channelsSlice';
import { actions as modalActions } from '../slices/modalsSlice';
import Channel from './Channel';

const Channels = () => {
  const channels = useSelector(selectors.selectAll);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    dispatch(modalActions.setModal({ type: 'addingChannel' }));
  };

  return (
    <>
      <Row className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <Col>
          <b>{t('channels.name')}</b>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="outline-primary" size="sm" onClick={() => handleClick()}>
            <span><b>+</b></span>
          </Button>
        </Col>
      </Row>
      <Row className="d-flex flex-column h-100 w-100 m-0 overflow-auto">
        <ListGroup as="ul" className="rounded-0 mb-3 flex-column w-100 p-0 d-block list-group-flush">
          {channels.map((channel) => (
            <Channel key={channel.id} channel={channel} />
          ))}
        </ListGroup>
      </Row>
    </>
  );
};

export default Channels;
