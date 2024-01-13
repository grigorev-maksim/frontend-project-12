import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { actions as channelActions } from '../slices/channelsSlice';
import Channels from './Channels';
import Messages from './Messages';
import Spinner from './Spinner';
import getAuthHeader from '../helpers';
import routes from '../routes';

const MainPage = () => {
  const [loadingState, setLoadingState] = useState('loading');
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    const fetch = async () => {
      try {
        const header = getAuthHeader();
        const response = await axios.get(routes.usersPath(), { headers: header });
        const { data } = response;
        dispatch(channelActions.setInitial(data));
        setLoadingState('idle');
      } catch (e) {
        setLoadingState('loading');
        toast.error(t('toast.errors.fetchError'));
      }
    };
    fetch();
  }, [dispatch, t]);

  return (
    loadingState === 'loading' ? <Spinner />
      : (
        <Container className="my-4 rounded shadow overflow-hidden h-100">
          <Row className="bg-white h-100 flex-md-row">
            <Col className="channels col-4 col-md-2 border-end px-0 bg-light d-flex flex-column h-100">
              <Channels />
            </Col>
            <Col className="p-0 h-100">
              <Messages />
            </Col>
          </Row>
        </Container>
      )
  );
};
export default MainPage;
